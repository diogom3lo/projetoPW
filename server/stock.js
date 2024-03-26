const bodyParser = require('body-parser');
const express = require('express');
const Stock = require('../data/stock');

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
        router.put('/:id', function(req, res, next) {
            let body = req.body;
            let id = req.params.id;
            
            StockController.update(id, body)
                .then(() => {
                    console.log('Stock updated!');
                    res.status(200).json({ message: 'Stock updated successfully' });
                })
                .catch((err) => {
                    console.error('Error updating stock:', err);
                    if (err instanceof Error && err.message === 'Stock not found or no changes made') {
                        res.status(404).json({ error: 'Stock not found or no changes made' });
                    } else {
                        res.status(500).json({ error: 'Internal server error' });
                    }
                });
        });
    


    
    
    return router;
}



module.exports = StockRouter;