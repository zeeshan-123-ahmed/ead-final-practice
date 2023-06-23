const logEvents = require('./logEvents'); //custom module

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};


//initialize object
const myEmitter = new MyEmitter();

//add a listener for the log event (listening for the log event)
myEmitter.on('log', (msg) => logEvents(msg))


//need to emit the event to test it out
setTimeout(() => {
    //Emit the event
    myEmitter.emit('log', 'Log event emitted.')
}, 2000) //keep 2 seconds by keeping in mind how much time take nodemon to restart the server