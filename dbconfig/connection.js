require('dotenv').config();
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/jsbotDB';
console.log(connectionString.replace(connectionString.slice(connectionString.indexOf('root:')+5, connectionString.indexOf('@main')+1),'<*******>'));
mongoose.connect(connectionString)


module.exports = mongoose.connection;