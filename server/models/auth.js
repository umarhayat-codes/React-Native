const mongoose = require("mongoose")

const {Schema} = mongoose

const schema = new Schema({
    email : {type : String, unique : true, required : true},
    firstName : {type : String},
    user_id : {type : String, unique : true, required : true},
    password : {type : String, required : true},
    emailVerified : {type : Object, default : false},
    status : {type : String, default : 'active'},
    roles : {type : [String], default : ['customer']},
},{timeseries : true})

const auth = mongoose.model('users',schema)
module.exports = auth