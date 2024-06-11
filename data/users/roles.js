const scopes = require('./scope');

module.exports = {
  admin: [scopes["read-all"], scopes["manage-posts"], scopes["read-posts"]],
  user: [scopes["read-posts"]],
};

