const config = require("../../config");

function ClientsService() {
    let service = {
        create,
        createToken
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
            .catch((err) => reject("Error creating user"));
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

    return service;
}

module.exports = ClientsService;