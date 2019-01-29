var express = require("express");
var hbs = require("hbs");

//Express object
var app = express();

//Sending info allocation
app.set('view engine', 'hbs');
app.use(express.urlencoded())

//Set up the public folder
app.use(express.static(__dirname + "/public"));

hbs.registerHelper('error404', () => {
    var errorSt = ""
    for(var i = 0; i< 50; i++){
        
        var myType = Math.floor(Math.random()*3) + 1
        if(myType == 1){
            errorSt += "<div class=\"shrink\">404</div>"
        }else if(myType == 2){
            errorSt += "<div class=\"rotate\">404</div>"
        }else
        {
            errorSt += "<div class=\"still\">404</div>"
        }
    }
    return errorSt
});

//Set up the public folder
app.use(express.static(__dirname + "/public"));

//This is for the index page
app.get('/', (req, res)=>{
    res.render('index.hbs', {title:'Homework 3 Index'});
})

//This is for the index page
app.get('/error', (req, res)=>{
    res.render('error.hbs', {title:'Error 404'});
})

//This is for the boxes page
app.get('/boxes', (req, res)=>{
    res.render('boxes.hbs', {title: "Box page"});
})  

//for boxes page
app.all('/boxResult', (req, res)=>{
res.render('boxResult.hbs', {result: Number(req.body.boxSize) });
})

//Grid helper
hbs.registerHelper('makeGrid', (gridSize)=>{

    var myString = "<table>";

    for(var j = 0; j < gridSize; j++){
        myString += "<tr>"
        for(var i = 0; i< gridSize; i++)
        {
            var color = ((1<<24)*Math.random()|0).toString(16);
            myString += "<td style = \"width:150px; height: 75px; background-color:#" + color + "\">" + color + "<br><span style=\"color:#FFFFFF\">" + color + "</span></td>"
        }
        myString += "</tr>"
    }
    myString += "</table>"
    //console.log(myString)
    return myString
});


app.get('*', (req, res)=>{
    res.render("error.hbs")
})

//Listening here
app.listen(3000, ()=>{
    console.log('Server is up at localhost:3000');
});