//import express server module
const express = require('express');
//import SQL connection module
const db = require('./db/connection');
//api routes
const apiRoutes = require('./routes/apiRoutes')
//import inputCheck module
const inputCheck = require('./utils/inputCheck');

//server PORT settings
const PORT = process.env.PORT || 3001;
//server instance
const app = express();


//express server middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//node.js will automatically look for index.js here
app.use('/api', apiRoutes);

//default response for any other request (Not Found), this 'catchall' route needs to be the last defined route!
app.use((req, res) => {
    res.status(404).end();
});

//start the server after the database connection is established
db.connect(err => {
    if(err) throw err;
    console.log('Connected to election database.');
    //start the server on PORT
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
});




