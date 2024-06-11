const bodyParser = require('body-parser');
const express = require('express');
const userService = require('../data/users'); // Import the userService instance
const rolesConfig = require('../data/users/roles'); // Import roles configuration

function RouterAuth() {
    let router = express.Router();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    // Middleware to attach roles to the request
    router.use(userService.attachRoleUser);

    // Register Route
    router.route('/register').post(async (req, res, next) => {
        const body = req.body;
        console.log("User:", body);

        // Assign roles to the user
        if (!body.roles) {
            body.roles = ['user']; // Default role if none is provided
        }

        try {
            const newUser = await userService.create(body);
            const response = await userService.createToken(newUser);
            console.log("User Token:", response);
            res.status(200).send(response);
        } catch (err) {
            console.log("Error:", err);
            res.status(500).send({ message: "Error creating user", error: err.message });
        }
    });

    // Get User Info Route
    router.route("/me").get(userService.authorize(['read-all', 'read-posts']), async (req, res, next) => {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        try {
            const decoded = await userService.verifyToken(token);
            console.log(decoded);
            res.status(202).send({ auth: true, decoded });
        } catch (err) {
            console.log("Error:", err);
            res.status(500).send({ message: "Error verifying token", error: err.message });
        }
    });

    // Login Route
    router.route('/login').post(async (req, res, next) => {
        const body = req.body;

        console.log("Login for user:", body);
        try {
            const foundUser = await userService.findUser(body);
            console.log("User found:", foundUser);
            const response = await userService.createToken(foundUser);
            console.log("Token response:", response);
            res.status(200).send(response);
        } catch (err) {
            console.log("Error:", err);
            res.status(500).send({ message: "Error logging in", error: err.message });
        }
    });

    return router;
}

module.exports = RouterAuth;


