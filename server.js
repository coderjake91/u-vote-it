//import the express module and initialize the PORT settings
const express = require('express');
const PORT = process.env.PORT || 3001;
//import mysql2 module
const mysql = require('mysql2');
//import inputCheck module
const inputCheck = require('./utils/inputCheck');

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

//api endpoint route that queries the database using the query method on the instantiated 'db' object, select all rows in the candidates table
app.get('/api/candidates', (req, res) => {
    const sql = `select * from candidates`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = 'select * from candidates where id = ?';
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json( { error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a candidate (question mark in query statement denotes a 'prepared statement' with param argument for id)
app.delete('/api/candidate/:id', (req, res) => {
    const sql = 'delete from candidates where id = ?';
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({message: 'Candidate not found'
            });
        } else {
            res.json({
                message: ' successfully deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//create a candidate
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `insert into candidates (first_name, last_name, industry_connected) values (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'Candidate successfully added!',
            data: body
        });
    });
});

//default response for any other request (Not Found), this 'catchall' route needs to be the last defined route!
app.use((req, res) => {
    res.status(404).end();
});

//start the server on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



