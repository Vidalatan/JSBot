require('dotenv').config();
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/jsbotDB';
console.log(connectionString);
mongoose.connect(connectionString)


module.exports = mongoose.connection;