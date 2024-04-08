const Product = require('./product');
const ProductController = require('./productController');

const service = ProductController(Product);

module.exports = service;