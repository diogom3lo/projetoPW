let mongoose = require('mongoose');
const { type } = require('os');
let Schema = mongoose.Schema;

// Define the schema for the client model
let clientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : { type: String, required: true },
});

// Create the model from the schema and export it
let Client = mongoose.model('Client', clientSchema);

module.exports = Client;