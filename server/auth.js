const bodyParser = require('body-parser');
const express = require('express');
const userService = require('../data/users'); // Import the userService instance
const jwt = require("jsonwebtoken");

function RouterAuth() {
    let router = express.Router();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.route('/register').post(function (req, res, next) {
        const body = req.body;
        console.log("User:", body);
        userService.create(body)
            .then((newUser) => {
                return userService.createToken(newUser); // Use userService here
            })
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

    router.route("/me").get(function (req, res, next) {
        let token = req.headers['x-access-token'];

        if (!token) {
            return res
                .status(401)
                .send({ auth: false, message: 'No token provided.' });
        }
        return userService.verifyToken(token)
            .then((decoded) => {
                console.log(decoded);
                res.status(202).send({ auth: true, decoded });
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
                next();
            });
    });

    router.route('/login').post(function (req, res, next) {
        let body = req.body;
        let foundUser;

        console.log("Login for user:", body);
        return userService.findUser(body)
            .then((user) => {
                console.log("User found:", user);
                foundUser = user; // Store the found user
                return userService.createToken(foundUser); // Use userService here
            })
            .then((response) => {
                console.log("Token response:", response);
                res.status(200);
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

