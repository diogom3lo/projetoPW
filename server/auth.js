const bodyParser = require('body-parser');
const express = require('express');
const client = require('../data/clients');

function RouterAuth(){
    let router = express.Router();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    router.route('/register').post(function(req, res, next){
        const body = req.body;
        console.log("User:", body);
        client.create(body)
        .then(() => client.createToken(body))
        .then((response) => {
            res.status(200);
            console.log("User Token:", response);
            res.send(response);
        })
        .catch((err) => {
            res.status(500);
            console.log("Error:", err);
            next();
        });
    });

    return router;
};

module.exports = RouterAuth;