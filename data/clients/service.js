const config = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function ClientsService(ClientModel) {
    let service = {
        create,
        createToken,
        verifyToken,
        findClient
    }

    // Create a new client
    function create(client) {
        return createPassword(client).then((hashPassword, err) => {
            if (err) {
                return Promise.reject("Not saved");
            }
           let newClientWithPassword = {
               ...client,
               password: hashPassword
           };
           let newClient = new ClientModel(newClientWithPassword);
           return save(newClient);
        });
     
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
        console.log("Creating token for client:", client);
        let token = jwt.sign(
            {id: client._id, name: client.name},
            config.secret,
            {expiresIn: config.expiresPassword,}
        );
        console.log("Token created:", token);
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

    function findClient({email, password}) {
        return new Promise(function (resolve, reject)  {
            ClientModel.findOne({ email })
            .then((client) => {
                if (!client) return reject("Client not found");
                return comparePassword(password, client.password).then((match) => {
                    if (!match) return reject("Client not valid");
                  return resolve(client);
            });
        })
            .catch((err) => {
                reject(`There is a problem with the login: ${err}`); 
            });
        });
    }
    
function createPassword(client) {
    return bcrypt.hash(client.password, config.saltRounds);
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
    
    return service;
}

module.exports = ClientsService;