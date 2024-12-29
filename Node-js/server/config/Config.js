
const mongoose = require('mongoose')

const Config = () => {
    mongoose.connect('mongodb+srv://umarhayatcoder:vXtDrwIIh0BVfW0e@cluster0.5gks7.mongodb.net/',{dbName : "register"})
    .then (res => {
        console.log('Connected');
    }) 
}  

module.exports = {Config}