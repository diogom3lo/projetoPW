const Compras = require('./compras');
const ComprasController = require('./comprasController');

const service = ComprasController(Compras);

module.exports = service;