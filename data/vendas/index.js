const Vendas = require('./vendas');
const VendasController = require('./vendasController');

const service = VendasController(Vendas);

module.exports = service;