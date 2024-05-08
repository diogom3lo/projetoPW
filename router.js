const express = require('express');
let RouterProduct = require('./server/product');
let RouterAuth = require('./server/auth');
let RouterVendas = require('./server/vendas');

function initialize(){
    let api = express();
    
    api.use('/auth', RouterAuth());
    api.use('/api', RouterProduct());
    api.use('/vendas', RouterVendas());


    return api;
}

module.exports ={
    initialize : initialize,
};