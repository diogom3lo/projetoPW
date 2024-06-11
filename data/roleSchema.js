const mongoose = require('mongoose');
const scopes = require('./users/scope');

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    scopes: [{ type: String, enum: Object.values(scopes) }]
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
