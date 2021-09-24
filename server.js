//import the express module and initialize the PORT settings
const express = require('express');
const PORT = process.env.PORT || 3001;

//server instance
const app = express();

//require express server middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//default response for any other request (Not Found), this 'catchall' route needs to be the last defined route!
app.use((req, res) => {
    res.status(404).end();
});

//start the server on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



