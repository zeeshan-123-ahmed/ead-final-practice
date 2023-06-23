const http = require('http'); //import http to create server

//create server with callback
http.createServer((req, res) => {
    res.write('Welcome to the world of node.js'); //write response to client
    res.end(); //end the response
}).listen(5000);    //server object listening on port 5000

console.log('Server listening on port 5000');