//import common core modules
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents'); //custom module
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
//initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))
const PORT = process.env.PORT || 3500;  //process.env.PORT will be used when we host it somewhere otherwise 3500 used


//server function
const serverFile = async (filePath, contentType, response) => {
    try{
        //lets get data from file
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData): rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            {'Content-Type': contentType}
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data):data
        )

    } catch(err){
        console.error(err);
        myEmitter.emit('log', `${err.name} : ${err.method}`, 'errLog.txt'); //creating log file for errors
        response.statusCode = 500;
        response.end();
    } //note, i call the parameter before the we are sending the res below
}

//create server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt'); //create log file

    //checking request url and send index.html  file
    /** Version:1
    let filePath;
    if(req.url == '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html')
        fs.readFile(filePath, 'utf-8', (err, data) => {
            res.end(data);
        })
    }
    //problem: this will work but not efficient. we have statement for every address that came in and actually every file is not index.html, not dynamic, take lot of space.
     */

   /**Version: 2
   let filePath;
    //we have case for every value that came in, even a duplicate case like if it is index.html but not '/'
    switch(req.url){
        case '/':
            res.statusCode = 200;
            filePath = path.join(__dirname, 'views', 'index.html')
            fs.readFile(filePath, 'utf-8', (err, data) => {
                res.end(data);
            })
    }
    //problem: this is also be very big because we have to keep in mind every possible file requested, default, 404 if not exists but this also takes a up a lot of space and once again it is not dynamic
    */

        const extension = path.extname(res.url);
        let contentType;
        switch(extension){
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.jpg':
                contentType = 'img/jpg';
                break;
            case '.png':
                contentType = 'img/png';
                break;
            case '.txt':
                contentType = 'text/plain';
                break;
            default: //when url only contain '/' or could have extension '.html'
                contentType = 'text/html';
        }

        //set the value of file path according to content type and requested url
        let filePath = 
            contentType === 'text/html' && req.url === '/' //if url only contains / means default page
                ? path.join(__dirname, 'views', 'index.html') //index.html inside views folder
                : contentType === 'text/html' && req.url.slice(-1) === '/' //if last character in url is /, means subdirectory path
                    ? path.join(__dirname, 'views', req.url, 'index.html') //use req.url to get the index.html inside views->subdir->index.html
                    : contentType === 'text/html'
                        ? path.join(__dirname, 'views', req.url) //whatever is requested in the views folder
                        : path.join(__dirname, req.url) //for file other than html like css, image, or any other file inside another folder which is specified in the req.url

        //we can convert above into if-else statements, contentType statement is if condition and path.join is result

        //means / and didn't have file extension, requested file like about, new-page but user didn't type the .html after file name

        //makes .html extension not required in the browser
        if(!extension && req.url.slice(-1) !== '/') filepath += '.html';  //adding .html explicitly to retrieve .html file correctly

        //ready to check if we want to server the file
        const fileExists = fs.existsSync(filePath);
        if(filePath){
            //serve the file
            serverFile(filePath, contentType, res); //res for server
        }
        else{
            //404 error -> file not exist
            //301 error-> redirect
            switch(path.parse(filePath)){
                case 'old-page.html': //when we have old page and need to redirect in new page
                    res.writeHead(301, {'Location':'/new-page.html'});
                    res.end();
                    break;
                case 'www-page.html':
                    res.writeHead(301, {'Location':'/'});
                    res.end();
                    break;
                default:
                    //server a 404 response
                    serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
            }
        }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})





