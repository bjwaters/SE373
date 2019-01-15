var express = require("express");
var hbs = require("hbs");

//Express object
var app = express();

//Sending info allocation
app.set('view engine', 'hbs');
app.use(express.urlencoded())


//Set up the public folder
app.use(express.static(__dirname + "/public"));

//This is for the index page
app.get('/', (req, res)=>{
    //res.send('<h2>Hello World </h2>');
    res.render('index.hbs', {title:'Homework 2 Index'});
})

//This is for the about page
app.get('/about', (req, res)=>{
    res.render('about.hbs', {title:'About'});
})

//This is for the results
app.get('/form', (req, res)=>{
    res.render('form.hbs', {title:'Form'});
})


//for form page
//Alternative to the post(form)
app.all('/results', (req, res)=>{
    res.render('results.hbs', {name: req.body.myName, email: req.body.myEmail, comment: req.body.comments});
})

//Listening here
app.listen(3000, ()=>{
    console.log('Server is up at localhost:3000');
});