//import the express module and initialize the PORT settings
const express = require('express');
const PORT = process.env.PORT || 3001;
//import mysql2 module
const mysql = require('mysql2');

//server instance
const app = express();

//require express server middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'',
        password:'',
        database: 'election'
    },
    console.log('Connected to the election database')
);

//query the database using the query method on the instantiated 'db' object, select all rows in the candidates table
// db.query(`select * from candidates`, (err, rows) => {
//     //console.log(rows);
// });

//GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

//delete a candidate (question mark in query statement denotes a 'prepared statement' with param argument for id)
// db.query(`delete from candidates where id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//create a candidate
// const sql = `insert into candidates (id, first_name, last_name, industry_connected) values (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });


//default response for any other request (Not Found), this 'catchall' route needs to be the last defined route!
app.use((req, res) => {
    res.status(404).end();
});

//start the server on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



