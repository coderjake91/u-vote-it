//import mysql2 module
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'',
        password:'',
        database: 'election'
    },
);

module.exports = db;