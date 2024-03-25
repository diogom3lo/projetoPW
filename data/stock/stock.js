var mongoose = require('mongoose');

let Schema = mongoose.Schema;

var StockSchema = new Schema({
    name: {type: String, required: true, unique: true},
    number: {type: Number, required: true}
});

let Player = mongoose.model('Stock', StockSchema);
module.exports = Player;