const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title : String,
    description : String,
    id : {type : String,unique : true },
    price : String,
    createdAt:String,
    createBy : String,
    location: String,
    category:String
},{timestamps : true})

const todos = mongoose.model("todos",schema)
module.exports = todos