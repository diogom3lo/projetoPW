const bodyParser = require('body-parser');
const express = require('express');
const Stock = require('../data/stock');
const StockController = require('../data/stock/stockController');

function StockRouter() {
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    // Handle GET and POST requests for '/stock'
    router.route('/stock')
        .get(function(req, res, next){
            console.log('get all stock');
            Stock.findAll()
            .then((stock) => {
                res.send(stock);
                next();
            })
            .catch((err) => {
                next(err); // Pass the error to error-handling middleware
            });
        })
        .post(function(req, res, next){
            console.log('post');
            let body = req.body;
          
            Stock.create(body)
            .then(() => {
                console.log('Created!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('stock already exists!');
                err.status = err.status || 500;
                res.status(400).send('Error creating stock');
                next(err); // Pass the error to error-handling middleware
            });
        });

    // Define GET request separately for '/stock/:id'
    router.get('/stock/:id', function(req, res, next) {
        let id = req.params.id;
        Stock.findById(id)
            .then((stock) => {
                console.log('Stock found!');
                res.send(stock);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Stock not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding stock');
                next(err); // Pass the error to error-handling middleware
            });
    });

// Define GET request separately for '/stock/name/:name'
router.get('/stock/name/:name', function(req, res, next) {
    let name = req.params.name;
    Stock.findByName(name)
        .then((stock) => {
            console.log('Stock found!');
            res.send(stock);
            next();
        })
        .catch((err) => {
            console.log(err);
            console.log('Stock not found');
            err.status = err.status || 500;
            res.status(400).send('Error finding stock');
            next(err); // Pass the error to error-handling middleware
        });
});



    // Define PUT request separately for '/stock/:id'
    router.put('/stock/:id', function(req, res, next) {
        let body = req.body;
        let id = req.params.id;
        Stock.update(id, body)
            .then(() => {
                console.log('Stock updated!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Stock not found or no changes made');
                err.status = err.status || 500;
                res.status(400).send('Error updating stock');
                next(err); // Pass the error to error-handling middleware
            });
    });


    router.put('/stock/name/:name', function(req, res, next) {
        let body = req.body;
        let name = req.params.name;
        Stock.updateByName(name, body)
            .then(() => {
                console.log('Stock updated!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Stock not found or no changes made');
                err.status = err.status || 500;
                res.status(400).send('Error updating stock');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define DELETE request separately for '/stock/:id'
    router.delete('/stock/:id', function(req, res, next) {
        let id = req.params.id;
        Stock.deleteStockItem(id)
            .then(() => {
                console.log('Stock deleted!');
                res.status(200).send('Stock deleted');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Stock not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting stock');
                next(err); // Pass the error to error-handling middleware
            });
    });



    router.delete('/stock/name/:name', function(req, res, next) {
        let name = req.params.name;
        Stock.deleteStockItemByName(name)
            .then(() => {
                console.log('Stock deleted!');
                res.status(200).send('Stock deleted');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Stock not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting stock');
                next(err); // Pass the error to error-handling middleware
            });
    });

    return router;
}

module.exports = StockRouter;
