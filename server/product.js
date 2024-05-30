const bodyParser = require('body-parser');
const express = require('express');
const Product = require('../data/product');
const ProductController = require('../data/product/productController');
const User = require('../data/users');
const { decode } = require('punycode');
const scopes = require('../data/users/scope');

function ProductRouter() {
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    // Middleware to check if the client is authorized
    router.use(function(req, res, next) {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res
                .status(403)
                .send({ auth: false, message: "No token provided." });
        }

        User.verifyToken(token)
        .then((decoded) => {
            console.log("-=> Valid Token <=-");
            console.log("DECODED->" + JSON.stringify(decoded, null, 2));
            req.roleClient = decoded.role;
            next();
        })
        .catch(() => {
            res.status(401).send({ auth: false, message: "Not authorized." });
        })
    });

    // Handle GET and POST requests for '/product'
    router.route('/product')
        .get(User.authorize([scopes["read-all"], scopes["read-posts"]]), function(req, res, next){
            console.log('get all product');
            Product.findAll()
            .then((product) => {
                res.send(product);
                next();
            })
            .catch((err) => {
                next(err); // Pass the error to error-handling middleware
            });
        })
        .post(User.authorize([scopes["manage-posts"]]), function(req, res, next){
            console.log('post');
            let body = req.body;
          
            Product.create(body)
            .then(() => {
                console.log('Product Created!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('product already exists!');
                err.status = err.status || 500;
                res.status(400).send('Error creating product');
                next(err); // Pass the error to error-handling middleware
            });
        });

    // Define GET request separately for '/product/:id'
    router.get('/product/:id', (User.authorize([scopes["read-all"], scopes["read-posts"]])), function(req, res, next) {
        let id = req.params.id;
        Product.findById(id)
            .then((product) => {
                console.log('Product found!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define GET request separately for '/product/sort/:sortBy'
    router.get('/product/sort/:sortBy', (User.authorize([scopes["read-all"], scopes["read-posts"]])), function(req, res, next) {
        let sortBy = req.params.sortBy;
        Product.findAllAndSort(sortBy)
            .then((product) => {
                console.log('Product found and sorted!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Error finding and sorting product');
                err.status = err.status || 500;
                res.status(400).send('Error finding and sorting product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define GET request separately for '/product/name/:name'
    router.get('/product/name/:name', (User.authorize([scopes["read-all"], scopes["read-posts"]])), function(req, res, next) {
        let name = req.params.name;
        Product.findByName(name)
            .then((product) => {
                console.log('Product found!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define PUT request separately for '/product/:id'
    router.put('/product/:id', (User.authorize([scopes["manage-posts"]])), function(req, res, next) {
        let id = req.params.id;
        let body = req.body;
        Product.update(id, body)
            .then(() => {
                console.log('Product updated!');
                res.status(200).send('Product updated!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error updating product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define PUT request separately for '/product/name/:name'
    router.put('/product/name/:name', (User.authorize([scopes["manage-posts"]])), function(req, res, next) {
        let body = req.body;
        let name = req.params.name;
        Product.updateByName(name, body)
            .then(() => {
                console.log('Product updated!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found or no changes made');
                err.status = err.status || 500;
                res.status(400).send('Error updating stock');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define DELETE request separately for '/product/:id'
    router.delete('/product/:id', (User.authorize([scopes["read-all"], scopes["read-posts"]])), function(req, res, next) {
        let id = req.params.id;
        Product.delete(id)
            .then(() => {
                console.log('Product deleted!');
                res.status(200).send('Product deleted!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define DELETE request separately for '/product/name/:name'
    router.delete('/product/name/:name', (User.authorize([scopes["read-all"], scopes["read-posts"]])), function(req, res, next) {
        let name = req.params.name;
        Product.deleteByName(name)
            .then(() => {
                console.log('Product deleted!');
                res.status(200).send('Product deleted!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting product');
                next(err); // Pass the error to error-handling middleware
            });
    });

    return router;
}

module.exports = ProductRouter;