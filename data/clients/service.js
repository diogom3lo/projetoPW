const config = require("../../config");
const jwt = require("jsonwebtoken");

function ClientsService(ClientModel) {
    let service = {
        create,
        createToken,
        verifyToken
    }

    // Create a new client
    function create(client) {
        let newClient = new ClientModel(client);
        return save(newClient);
    }

    // Save the client
    function save(model) {
        return new Promise((resolve, reject) => {
            model
            .save()
            .then(() => resolve("User created"))
            .catch((err) => reject(`Error creating user ${err}`));
        });
    }

    // Create a token for the client
    function createToken(client){
        let token = jwt.sign(
            {id: client._id, name: client.name},
            config.secret,
            {expiresIn: config.expiresPassword,}
        );

        return {auth: true, token};
    }

    function verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    return resolve(decoded);
                }
            });
        });
    }

    return service;
}

module.exports = ClientsService;