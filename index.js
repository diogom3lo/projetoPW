const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');
let router = require('./router');

const hostname = '127.0.0.1';
const port = 3000;

// Import the router module

// Create an instance of the Express application
var app = express();

// Initialize the router
app.use(router.initialize());

// Connect to MongoDB using the configuration from the config module
mongoose.connect(config.db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// Create an instance of the HTTP server using the Express application
const server = http.Server(app);

// Start the server and listen for incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


