const express = require('express');
let RouterProduct = require('./server/product');
let RouterAuth = require('./server/auth');
let RouterVendas = require('./server/vendas');
let RouterCompras = require('./server/compras');

function initialize(){
    let api = express();
    
    api.use('/auth', RouterAuth());
    api.use('/api', RouterProduct());
    api.use('/vendas', RouterVendas());
    api.use('/compras', RouterCompras());

    return api;
}

module.exports ={
    initialize : initialize,
};