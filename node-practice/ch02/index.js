//index.js

//importing modules
const fsPromises = require('fs').promises
const path = require('path')


const fileOps = async () => {
    try{
        const data =  await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf8');
        console.log(data)
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data) //to delete starter.txt file
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data) //write data into new file
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you.') //append new data to existing file
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt')) //rename existing file
        const newData =  await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'),'utf8'); //reading new renamed file data
        console.log(newData) //print new data to console
    } catch(err){
        console.error(err);
    }
}

fileOps();
