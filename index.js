const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./router');
const cors = require('cors'); // Import the CORS middleware

// Define the hostname and port
const hostname = '127.0.0.1';
const port = 3001;

// Create an instance of the Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Use the router module to initialize routes
app.use(router.initialize());

// Connect to MongoDB using the configuration from the config module
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Create an instance of the HTTP server using the Express application
const server = http.createServer({
    maxHeaderSize: 8192 // Increase this value as needed
}, app);

// Start the server and listen for incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});





