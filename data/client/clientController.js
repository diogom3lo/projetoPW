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
}