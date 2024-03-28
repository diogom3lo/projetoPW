var mongoose = require('mongoose');

// Define the schema for the stock model
let Schema = mongoose.Schema;

var StockSchema = new Schema({
    name: {type: String, required: true, unique: true}, // Name of the stock (required and unique)
    number: {type: Number, required: true} // Number of stocks (required)
});

// Create the Stock model using the schema
let Stock = mongoose.model('Stock', StockSchema);

// Export the Stock model
module.exports = Stock;