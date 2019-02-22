var express = require('express')
var hbs = require('hbs')
var mongoose = require('mongoose')

var Empl = require('./schema/empl.js')

var app = express()
app.set("view engine", hbs)

app.use(express.static(__dirname + "/public")); 
app.use(express.static(__dirname + "/partials")); 

mongoose.connect('mongodb://localhost:27017/Empl', {useNewUrlParser:true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
    console.log("we're connected!")
})

app.use(express.urlencoded({extended:false}))

app.get('/', function(req, res){
    res.render('index.hbs', {title: "Starting page"})
})

app.get("/view", function(req, res){
    Empl.find({salary:{$gt:0}}, function(err, data){
    //console.log(data)

    var results = "Search Results:<br><br><table>"
    results += "<tr><th>First Name</th><th>Last Name</th><th>Job Title</th><th>Department</th><th>Start Date</th><th>Salary</th></tr>"
    for(var i = 0; i < data.length; i++){

        results +="<tr>"
        + "<td>" + data[i].firstName +"</td>" 
        + "<td>" + data[i].lastName + "</td>"
        + "<td>" + data[i].jobTitle + "</td>"
        + "<td>" + data[i].department + "</td>"
        + "<td>" + data[i].startDate + "</td>"
        + "<td>" + data[i].salary + "</td>"
        + "<td> <form action = '/update' method='POST'><button type='submit' name='updateme' value =" + data[i]._id + ">Update</button></form></td>"
        + "<td> <form action = '/delete' method='POST'><button type='submit' name='deleteme' value =" + data[i]._id + ">Delete</button></form></td>"
        + "</tr>"
    }
    results += "</table>"
    res.render('view.hbs', {myResults:results})
    })
})

app.all('/update', (req, res) => {

    console.log("Update pressed")
    var updateButton = req.body.updateme

    Empl.find({_id:updateButton}, function(err, data){
        console.log("Update Data: " + data)
        console.log("Date: " + data[0].startDate)

        var date = data[0].startDate
        var day = date.getDate()
        if(day < 10){
            day = "0" + day
        }
        var month = date.getMonth() + 1
        if(month < 10 ){
            month = "0" + month
        }
        var year = date.getFullYear()
        var translatedDate = "" +day + "/"+ month + "/" + year

        res.render('update.hbs', {fname:data[0].firstName, lname:data[0].lastName,
        dept:data[0].department, start:translatedDate, title:data[0].jobTitle,
        salary:data[0].salary, myVal:data[0]._id})
        
    })
})

app.all('/delete', (req, res)=>{
    console.log("Delete pressed")

    var deleteButton = req.body.deleteme;
    //console.log("test:" + deleteButton)
    

     Empl.deleteOne({_id:deleteButton}, function(err){
         return console.log("Error:" + err)
     })
     //console.log("deleted");

    res.render('delete.hbs', {id:deleteButton})
})


app.all('/newEmployee', (req, res)=>{
    var fname =  req.body.fName;
    var lname = req.body.lName;
    var dept = req.body.dept;
    var sdate = req.body.sDate;
    var title = req.body.title;
    var salary = req.body.salary;
    
    var empl = new Empl({firstName:fname, lastName:lname,
                          department:dept, startDate:sdate,
                          jobTitle:title, salary:salary})
                          //console.log(empl)
       empl.save(function(err){
           return  console.log(err)
       })

       //console.log(Empl.find({name:"Jay"}))
    res.render('index.hbs', {message:"Added new value!"})
})

//Update issues
app.all('/updateEmployee', (req, res)=>{

    var updateButton = req.body.updateMe;
    console.log(updateButton)

    var fname =  req.body.updateFName;
    var lname = req.body.updateLName;
    var dept = req.body.updateDept;
    var sdate = req.body.updateSDate;
    var title = req.body.updateTitle;
    var salary = req.body.updateSalary;

    Empl.updateOne({_id:updateButton}, {firstName:fname,lastName:lname, department:dept,
            startDate:sdate, jobTitle:title, salary:salary}, function(err){
        console.log("test" + lname)
        if(err){
            console.log(err)
        }
    })

    // Empl.updateOne({_id:updateButton}, {lastName:lname}, function(err){
    //     if(err){
    //         console.log(err)
    //     }
    // })

    //This is just a lazy way of getting back to the listing
    Empl.find({salary:{$gt:0}}, function(err, data){
    
        var results = "Search Results:<br><br><table>"
        results += "<tr><th>First Name</th><th>Last Name</th><th>Job Title</th><th>Department</th><th>Start Date</th><th>Salary</th></tr>"
        for(var i = 0; i < data.length; i++){
    
            results +="<tr>"
            + "<td>" + data[i].firstName +"</td>" 
            + "<td>" + data[i].lastName + "</td>"
            + "<td>" + data[i].jobTitle + "</td>"
            + "<td>" + data[i].department + "</td>"
            + "<td>" + data[i].startDate + "</td>"
            + "<td>" + data[i].salary + "</td>"
            + "<td> <form action = '/update' method='POST'><button type='submit' name='updateme' value =" + data[i]._id + ">Update</button></form></td>"
            + "<td> <form action = '/delete' method='POST'><button type='submit' name='deleteme' value =" + data[i]._id + ">Delete</button></form></td>"
            + "</tr>"
        }
        results += "</table>"
        res.render('view.hbs', {myResults:results})
        })
})

app.listen("3000", ()=>{
    console.log("Server up on port 3000")
})



// app.all('/newEmployee', (req, res)=>{
//     // res.render('added.hbs',
//     // {enteredFirst:String(req.body.fName)},
//     // {enteredLast:String(req.body.lName)},
//     // {enteredDept:String(req.body.dept)},
//     // {enteredStart:Date(req.body.sDate)},
//     // {enteredTitle:String(req.body.title)},
//     // {enteredSalary:Number(req.body.salary)}
//     // )

//     var one =  document.getElementById("fName").value
//     var two = document.getElementById("lName").value
//     var three = document.getElementById("dept").value
//     var four = document.getElementById("sDate").value
//     var five = document.getElementById("title").value
//     var six = document.getElementById("salary").value

//     addme(one, two, three, four, five, six)
//     res.render('added.hbs')
// })

// function addMe(one, two, three, four, five, six){
//     var addMe = new Empl({firstName:one, lastName:two,
//                           department:three, startDate:four, jobTitle:five, salary:six})
//         addMe.save(function(err, cat){
//             console.log("Saved!")
//         })
// }
