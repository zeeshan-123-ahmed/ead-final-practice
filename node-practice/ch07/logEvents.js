const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

//common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//creating a tab delimited log file
const logEvents = async (message, logName) => {
    const dataTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try{
        //create logs directory if not exists
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);

    } catch(err){
        console.error(err);
    }
}

module.exports = logEvents;