const express = require('express');
const RouterProduct = require('./server/product');
const RouterAuth = require('./server/auth');
const RouterVendas = require('./server/vendas');
const RouterCompras = require('./server/compras');

function initialize() {
    const api = express();

    // Use the route modules
    api.use('/auth', RouterAuth());
    api.use('/api', RouterProduct());
    api.use('/vendas', RouterVendas());
    api.use('/compras', RouterCompras());

    return api;
}

module.exports = {
    initialize
};
