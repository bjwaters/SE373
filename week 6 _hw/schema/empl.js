let mongoose = require('mongoose')

let emplSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    department:String,
    startDate:Date,
    jobTitle:String,
    salary:Number
})

module.exports = mongoose.model('Empl', emplSchema)