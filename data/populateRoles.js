const mongoose = require('mongoose');
const Role = require('./roleSchema'); // Adjust the path if necessary
const scopes = require('./users/scope');

const roles = [
    {
        name: 'admin',
        scopes: [scopes['read-all'], scopes['manage-posts'], scopes['read-posts']]
    },
    {
        name: 'user',
        scopes: [scopes['read-posts']]
    }
];

const createRoles = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/yourdbname', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing roles
        await Role.deleteMany({});

        // Create new roles
        for (let role of roles) {
            await Role.create(role);
        }

        console.log('Roles created successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating roles:', error);
        mongoose.connection.close();
    }
};

createRoles();
