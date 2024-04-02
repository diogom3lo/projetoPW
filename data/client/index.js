const Client = require('./client');
const ClientController = require('./clientController');

const service = ClientController(Client);

module.exports = service;