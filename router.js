const express = require('express');
let RouterStock = require('./server/stock');
let RouterClient = require('./server/client');


function initialize(){
    let api = express();

    api.use('/api', RouterStock());
    api.use('/api', RouterClient());


    return api;
}

module.exports ={
    initialize : initialize,
};