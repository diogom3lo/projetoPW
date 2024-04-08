/**
 * ClientController handles the CRUD operations for the stock.
 * @param {Object} ClientModel - The model representing the stock.
 * @returns {Object} - The controller object with CRUD methods.
 */

function ClientController(ClientModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteClient
    }

    /**
     * Creates a new client.
     * @param {Object} values - The values for the new client.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */

    function create(values) {
        let newClient = ClientModel(values);
        return save(newClient);
    }

    function save(client) {
        return new Promise((resolve, reject) => {
            client.save()
                .then(() =>{
                    resolve('Client created');
                })
                .catch((err) => {
                    reject(err);
                });
            });
    }

    function findAll() {
        return new Promise((resolve, reject) => {
            ClientModel.find({})
                .then((client) => {
                    resolve(client);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findById(id) {
        return new Promise((resolve, reject) => {
            ClientModel.findById(id)
                .then((client) => {
                    resolve(client);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function update(id, values) {
        return new Promise(function(resolve, reject) {
            ClientModel.updateOne({_id: id}, values)
            .then(result => {
                if(result.nModified > 0) {
                    resolve('Client updated');
                } else {
                    reject('Client not found');
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    function deleteClient(id) {
        return new Promise(function(resolve, reject) {
            ClientModel.deleteOne({_id: id})
            .then(result => {
                if(result.deletedCount > 0) {
                    resolve('Client deleted');
                } else {
                    reject( new Error ('Client not found'));
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
    
    return controller;
}

module.exports = ClientController;