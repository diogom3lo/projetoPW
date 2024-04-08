const express = require('express');
let RouterStock = require('./server/stock');
let RouterClient = require('./server/client');
let RouterProduct = require('./server/product');


function initialize(){
    let api = express();
    
    api.use('/api', RouterStock());
    api.use('/api', RouterClient());
    api.use('/api', RouterProduct());


    return api;
}

module.exports ={
    initialize : initialize,
};