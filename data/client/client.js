var mongoose = require('mongoose');
var {ratings} = require ('stars-schema');

// Define the schema for the stock model
let Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {type: String, required: true}, // Name of the client (required)
    email: {type: String, required: true}, // Email of the client required)
    password: {type: String, required: true}, // Password of the client (required)
    role: {type: String, required: true}, // Role of the client (required)
});

// Create the Client model using the schema
let Client = mongoose.model('Client', ClientSchema);

// Export the Client model
module.exports = Client;
