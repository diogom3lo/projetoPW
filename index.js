const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

let router = require('./router');
var app = express();
app.use(router.initialize());

mongoose.connect(config.db)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

const server = http.Server(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


