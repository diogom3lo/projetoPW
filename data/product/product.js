var mongoose = require('mongoose');
var {ratings} = require ('stars-schema');

// Define the schema for the stock model
let Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, unique: true}, // Name of the stock (required and unique)
    number: {type: Number, required: true}, // Number of stocks (required)
    price: {type: Number, required: true}, // Price of the stock (required)
    category: {type: String, required: true}, // Category of the stock (required)
    description: {type: String, required: true}, // Description of the stock (required)
    image: {type: String, required: true}, // Image of the stock (required)
    rating: {type: Number, required: true} // Rating of the stock (required)
});

// Create the Stock model using the schema
let Product = mongoose.model('Product', ProductSchema);

// Export the Stock model
module.exports = Product;