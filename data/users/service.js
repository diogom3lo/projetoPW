const config = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

function UserService(UserModel) {
    let service = {
        create,
        createToken,
        verifyToken,
        findUser,
        authorize
    }

    // Check if the client is authorized
    function authorize(scopes) {
        return (request, response, next) => {
            const {roleUser} = request; //roleClient is the decoded token from verifyToken
            console.log("route scopes:", scopes);
            console.log("User scopes:", roleUser);

            const hasAtuhorization = scopes.some((scope) => roleUser.includes(scope));

            if(roleUser && hasAtuhorization) {
                 next();
            } else{
                response.status(403).json({ message: "Forbiden"});
            }
        }
    }

    // Create a new client
    function create(user) {
        return createPassword(user).then((hashPassword, err) => {
            if (err) {
                return Promise.reject("Not saved");
            }
           let newUserWithPassword = {
               ...user,
               password: hashPassword
           };
           let newUser = new UserModel(newUserWithPassword);
           return save(newUser);
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
    function createToken(user){
        let token = jwt.sign(
            { id: user._id, name: user.name, role: user.role.scopes },
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

    function findUser({email, password}) {
        return new Promise(function (resolve, reject)  {
            UserModel.findOne({ email })
            .then((user) => {
                if (!user) return reject("User not found");
                return comparePassword(password, user.password).then((match) => {
                    if (!match) return reject("User not valid");
                  return resolve(user);
            });
        })
            .catch((err) => {
                reject(`There is a problem with the login: ${err}`); 
            });
        });
    }
    
function createPassword(user) {
    return bcrypt.hash(user.password, config.saltRounds);
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
    
    return service;
}

module.exports = UserService;