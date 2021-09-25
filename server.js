//import the express module and initialize the PORT settings
const express = require('express');
const PORT = process.env.PORT || 3001;
//import mysql2 module
const mysql = require('mysql2');
const { brotliDecompress } = require('zlib');

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

//query the database using the query method on the instantiated 'db' object
db.query(`select * from candidates`, (err, rows) => {
    console.log(rows);
});


//default response for any other request (Not Found), this 'catchall' route needs to be the last defined route!
app.use((req, res) => {
    res.status(404).end();
});

//start the server on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



