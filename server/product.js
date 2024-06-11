const bodyParser = require('body-parser');
const express = require('express');
const Product = require('../data/product');
const User = require('../data/users');
const scopes = require('../data/users/scope');

function ProductRouter() {
    const router = express.Router();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    // Middleware to check if the client is authorized
    router.use(User.attachRoleUser);

    // Handle GET and POST requests for '/product'
    router.route('/product')
        .get(User.authorize([scopes["read-all"], scopes["read-posts"]]), async (req, res, next) => {
            try {
                const products = await Product.findAll();
                res.send(products);
            } catch (err) {
                next(err);
            }
        })
        .post(User.authorize([scopes["manage-posts"]]), async (req, res, next) => {
            try {
                const body = req.body;
                await Product.create(body);
                console.log('Product Created!');
                res.status(200).send(body);
            } catch (err) {
                console.error(err);
                res.status(400).send('Error creating product');
                next(err);
            }
        });

    // GET request for '/product/:id'
    router.get('/product/:id', User.authorize([scopes["read-all"], scopes["read-posts"]]), async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            res.send(product);
        } catch (err) {
            console.error(err);
            res.status(400).send('Error finding product');
            next(err);
        }
    });

    // GET request for '/product/sort/:sortBy'
    router.get('/product/sort/:sortBy', User.authorize([scopes["read-all"], scopes["read-posts"]]), async (req, res, next) => {
        try {
            const products = await Product.findAllAndSort(req.params.sortBy);
            res.send(products);
        } catch (err) {
            console.error(err);
            res.status(400).send('Error finding and sorting products');
            next(err);
        }
    });

    // GET request for '/product/name/:name'
    router.get('/product/name/:name', User.authorize([scopes["read-all"], scopes["read-posts"]]), async (req, res, next) => {
        try {
            const product = await Product.findByName(req.params.name);
            res.send(product);
        } catch (err) {
            console.error(err);
            res.status(400).send('Error finding product');
            next(err);
        }
    });

    // PUT request for '/product/:id'
    router.put('/product/:id', User.authorize([scopes["manage-posts"]]), async (req, res, next) => {
        try {
            await Product.update(req.params.id, req.body);
            res.status(200).send('Product updated!');
        } catch (err) {
            console.error(err);
            res.status(400).send('Error updating product');
            next(err);
        }
    });

    // PUT request for '/product/name/:name'
    router.put('/product/name/:name', User.authorize([scopes["manage-posts"]]), async (req, res, next) => {
        try {
            await Product.updateByName(req.params.name, req.body);
            res.status(200).send(req.body);
        } catch (err) {
            console.error(err);
            res.status(400).send('Error updating product');
            next(err);
        }
    });

    // DELETE request for '/product/:id'
    router.delete('/product/:id', User.authorize([scopes["manage-posts"]]), async (req, res, next) => {
        try {
            await Product.delete(req.params.id);
            res.status(200).send('Product deleted!');
        } catch (err) {
            console.error(err);
            res.status(400).send('Error deleting product');
            next(err);
        }
    });

    // DELETE request for '/product/name/:name'
    router.delete('/product/name/:name', User.authorize([scopes["manage-posts"]]), async (req, res, next) => {
        try {
            await Product.deleteByName(req.params.name);
            res.status(200).send('Product deleted!');
        } catch (err) {
            console.error(err);
            res.status(400).send('Error deleting product');
            next(err);
        }
    });

    return router;
}

module.exports = ProductRouter;

