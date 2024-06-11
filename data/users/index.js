const User = require('./client');
const UserService = require('./service');


const service = UserService(User);

module.exports = service;