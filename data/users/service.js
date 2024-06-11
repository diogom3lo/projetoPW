const config = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const rolesConfig = require('./roles');

function UserService(UserModel) {
    let service = {
        create,
        createToken,
        verifyToken,
        findUser,
        authorize,
        attachRoleUser
    };

    function attachRoleUser(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
    
        verifyToken(token)
            .then(decoded => {
                req.roleUser = decoded.roles || [];
                req.scopes = decoded.scopes || [];
                console.log("Decoded token roles:", decoded.roles);
                console.log("Decoded token scopes:", decoded.scopes);
                next();
            })
            .catch(err => {
                res.status(500).json({ message: "Failed to authenticate token", error: err.message });
            });
    }

    function authorize(scopes) {
        return (req, res, next) => {
            const userScopes = req.scopes;
            console.log("route scopes:", scopes);
            console.log("User scopes:", userScopes);
    
            if (!Array.isArray(userScopes)) {
                console.error('User scopes are undefined or not an array');
                return res.status(403).json({ message: "Forbidden" });
            }
    
            const hasAuthorization = scopes.some(scope => userScopes.includes(scope));
    
            if (hasAuthorization) {
                next();
            } else {
                res.status(403).json({ message: "Forbidden" });
            }
        };
    }

    function create(user) {
        return createPassword(user).then(hashPassword => {
            const newUser = {
                ...user,
                password: hashPassword,
                roles: user.roles || ['user'] // Assign default role if not provided
            };
            return save(new UserModel(newUser));
        }).catch(err => {
            console.error("Error creating user:", err);
            throw new Error("User creation failed");
        });
    }

    function save(model) {
        return new Promise((resolve, reject) => {
            model
                .save()
                .then(() => resolve("User created"))
                .catch((err) => reject(`Error creating user ${err}`));
        });
    }

    function createToken(user) {
        const userRoles = user.roles || [];
        const userScopes = getScopesFromRoles(userRoles);
    
        const token = jwt.sign(
            { id: user._id, name: user.name, roles: userRoles, scopes: userScopes },
            config.secret,
            { expiresIn: config.expiresPassword }
        );
        return { auth: true, token };
    }

    function getScopesFromRoles(roles) {
        const scopesSet = new Set();
        roles.forEach(role => {
            if (rolesConfig[role]) {
                rolesConfig[role].forEach(scope => scopesSet.add(scope));
            }
        });
        return Array.from(scopesSet);
    }

    function verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    function findUser({ email, password }) {
        return new Promise(function (resolve, reject) {
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
