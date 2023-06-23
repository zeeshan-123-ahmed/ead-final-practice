const http = require('https')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    console.log(path.resolve(path.join(__dirname, "pages", "home.html")))
    const home = fs.readFileSync("home.html")
    const about = fs.readFileSync("about.html")
    const notFound = fs.readFileSync("notFound.html")

    if(req.url == '/home'){
        res.end(home)
    }
    else if(req.url == '/about'){
        res.end(about)
    }
    else{
        res.end(notFound)
    }

    // res.end(() => {
    //     console.log('done')
    // })
})