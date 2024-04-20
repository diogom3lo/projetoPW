const express = require('express');
let RouterProduct = require('./server/product');
let RouterAuth = require('./server/auth');


function initialize(){
    let api = express();
    
    api.use('/auth', RouterAuth());
    api.use('/api', RouterProduct());


    return api;
}

module.exports ={
    initialize : initialize,
};