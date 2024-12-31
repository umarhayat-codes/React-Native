const mongoose = require('mongoose');
require('dotenv').config()

const Config = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
        .then(() => {
            console.log('Connected');
        })
        .catch((err) => {
            console.error('Database connection error:', err);
        });
};

module.exports = { Config };