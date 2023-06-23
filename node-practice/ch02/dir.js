const fs = require('fs') //import fs module

//create directory if it doesn't exist
if(!fs.existsSync('./new')){
    fs.mkdir('./new', (err) => {
        if(err) throw err;
        console.log("Directory created successfully")
    })
}


//remove directory if it does exist
if(fs.existsSync('./new')){
    fs.rmdir('./new', (err) => {
        if(err) throw err;
        console.log("Directory removed successfully")
    })
}