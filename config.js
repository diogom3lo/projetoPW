const config = {
    db:"mongodb+srv://admin:teste@cluster1.wlza8pn.mongodb.net/",
    secret: "supersecretkey",
    expiresPassword: 88400, //expires in 24 hours
    saltRounds: 10
};


module.exports = config;