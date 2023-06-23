//importing express module and start using it
const express = require('express');
const app = express(); //used app name because most of the examples use it.
const path = require('path');
const PORT = process.env.PORT || 3500;  //process.env.PORT will be used when we host it somewhere otherwise 3500 used



//1. built-in middleware is used for form data (unencoded data)

//we need to use below middleware to get form data when form is submitted.
app.use(express.urlencoded({extended:false}))

//another layer of middleware for json
//use below middleware when we need when json data is submitted, we need to be able to get those parameters or that data out-of the submission
app.use(express.json());

//use below middleware to serve static files like css, images etc.
app.use(express.static(path.join(__dirname, '/public')))


//2. custom middleware, let's create custom log


//define routers

// request begin and end with '/' or /index.html, (.html)? means whether use will give .html or not, page will be shown
app.get('^/$|index(.html)?', (req, res) => {
    // console.log('./views/index.html', {root: __dirname});
    console.log(path.join(__dirname, 'views', 'index.html'));
});

//showing new page
app.get('/new-page(.html)?', (req, res) => {
    console.log(path.join(__dirname, 'views', 'new-page.html'));
});

//resolving redirect problem
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301,'new-page.html'); //need to include response code 302 by default for redirect
});


//Route handlers: handler functions chain
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();                 //it will move on to the next handler and call another function in chain
}, (req, res) => {          //we can also add "next" here if add another chain but if it is last, then we leave it
   res.send('Hello World'); 
})


//chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three])
//defining default page using * (means all). Express will send 404 error means page is not found.
app.get('/*', (req, res) => {
    res.status(404).res.sendFile(path.join(__dirname, 'views', '404.html')); //by default will send 200 status code b/c it found the file needed
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





