const Client = require('./client');
const ClientService = require('./service');

const service = ClientService(Client);

module.exports = service;