const bodyParser = require('body-parser');
const express = require('express');
const Client = require('../data/client');
const ClientController = require('../data/client/clientController');

function ClientRouter() {
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    // Handle GET and POST requests for '/client'
    router.route('/client')
        .get(function(req, res, next){
            console.log('get all client');
            Client.findAll()
            .then((client) => {
                res.send(client);
                next();
            })
            .catch((err) => {
                next(err); // Pass the error to error-handling middleware
            });
        })
        .post(function(req, res, next){
            console.log('post');
            let body = req.body;
          
            Client.create(body)
            .then(() => {
                console.log('Client Created!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('client already exists!');
                err.status = err.status || 500;
                res.status(400).send('Error creating client');
                next(err); // Pass the error to error-handling middleware
            });
        });

    // Define GET request separately for '/client/:id'
    router.get('/client/:id', function(req, res, next) {
        let id = req.params.id;
        Client.findById(id)
            .then((client) => {
                console.log('Client found!');
                res.send(client);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Client not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding client');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define PUT request separately for '/client/:id'
    router.put('/client/:id', function(req, res, next) {
        let id = req.params.id;
        let body = req.body;
        Client.update(id, body)
            .then(() => {
                console.log('Client updated!');
                res.status(200).send('Client updated');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Client not found');
                err.status = err.status || 500;
                res.status(400).send('Error updating client');
                next(err); // Pass the error to error-handling middleware
            });
    });

    // Define DELETE request separately for '/client/:id'
    router.delete('/client/:id', function(req, res, next) {
        let id = req.params.id;
        Client.deleteClient(id)
            .then(() => {
                console.log('Client deleted!');
                res.status(200).send('Client deleted');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Client not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting client');
                next(err); // Pass the error to error-handling middleware
            });
    });

    return router;
}

module.exports = ClientRouter;