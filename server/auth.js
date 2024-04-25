const bodyParser = require('body-parser');
const express = require('express');
const client = require('../data/clients');
const jwt = require("jsonwebtoken");

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
    router.route("/me").get(function(req, res, next){
        let token = req.headers['x-access-token'];

        if (!token) {
            return res
            .status(401)
            .send({ auth: false, message: 'No token provided.' });
        }
        return client.verifyToken(token)
        .then((decoded) => {
            console.log(decoded);
        res.status(202).send({auth: true, decoded});
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });


    return router;
};

module.exports = RouterAuth;