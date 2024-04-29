const config = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

function ClientsService(ClientModel) {
    let service = {
        create,
        createToken,
        verifyToken,
        findClient,
        authorize
    }

    // Check if the client is authorized
    function authorize(scopes) {
        return (request, response, next) => {
            const {roleClient} = request; //roleClient is the decoded token from verifyToken
            console.log("route scopes:", scopes);
            console.log("client scopes:", roleClient);

            const hasAtuhorization = scopes.some((scope) => roleClient.includes(scope));

            if(roleClient && hasAtuhorization) {
                 next();
            } else{
                response.status(403).json({ message: "Forbiden"});
            }
        }
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
        let token = jwt.sign(
            { id: client._id, name: client.name, role: client.role.scopes },
            config.secret,
            {
                expiresIn: config.expiresPassword,
            }
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