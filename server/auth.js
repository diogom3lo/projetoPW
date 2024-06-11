const express = require('express');
const bodyParser = require('body-parser');
const userService = require('../data/users'); // Adjust the path if necessary
const Role = require('../data/roleSchema'); // Adjust the path if necessary

const RouterAuth = () => {
    let router = express.Router();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.post('/register', async (req, res, next) => {
        const { name, email, password, role } = req.body;

        try {
            const roleDoc = await Role.findOne({ name: role });
            if (!roleDoc) {
                return res.status(400).send({ message: 'Invalid role' });
            }

            const newUser = await userService.create({
                name,
                email,
                password,
                role: roleDoc._id
            });

            const token = await userService.createToken(newUser);
            res.status(200).send({ token });
        } catch (error) {
            res.status(500).send(error);
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


