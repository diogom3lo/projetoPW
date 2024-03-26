const bodyParser = require('body-parser');
const express = require('express');
const Stock = require('../data/stock');
const StockController = require('../data/stock/stockController');

function StockRouter() {
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    
    router.route('/stock')
        .get(function(req, res, next){
            console.log('get all stock');
            Stock.findAll()
            .then((stock) => {
                res.send(stock);
                next();
            })
            .catch((err) => {
                next();
            });
        })
        .post(function(req, res, next){
            console.log('post');
            let body = req.body;
          
            Stock.create(body)
            .then(() => {
                console.log('Created!');
                res.status(200);
                res.send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('stock already exists!');
                err.status = err.status || 500;
                res.status(400);
                next();
            });
        })
        .put('stock/:id', function(req, res, next) {
            let body = req.body;
            let id = req.params.id;
            Stock.update(id, body)
                .then(() => {
                    console.log('Stock updated!');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    console.log('Stock not found or no changes made');
                    err.status = err.status || 500;
                    res.status(400);
                    next();
                });
        });
    


    
    
    return router;
}



module.exports = StockRouter;