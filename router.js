const express = require('express');
let ProjetoAPI = require('.data/server/stock');

function initialize(){
    let api = express();

    api.use('/api', ProjetoAPI());

    return api;
}

module.exports ={
    initialize : initialize,
};