/**
 * StockController handles the CRUD operations for the stock.
 * @param {Object} StockModel - The model representing the stock.
 * @returns {Object} - The controller object with CRUD methods.
 */
function StockController(StockModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteStockItem,
        findByName,
        updateByName,
        deleteStockItemByName,
        findAllAndSort
    }

    /**
     * Creates a new stock item.
     * @param {Object} values - The values for the new stock item.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function create(values) {
        let newStock = StockModel(values);
        return save(newStock);
    }

    /**
     * Saves the stock item to the database.
     * @param {Object} newStock - The stock item to be saved.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function save(newStock) {
        return new Promise(function(resolve, reject) {
            newStock.save()
                .then(() => {
                    resolve('Stock created');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    /**
     * Finds all stock items.
     * @returns {Promise} - A promise that resolves with an array of stock items or rejects with an error.
     */
    function findAll() {
        return new Promise(function(resolve, reject) {
            StockModel.find({})
                .then((stock) => {
                    resolve(stock);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findAllAndSort(sortBy) {
        return StockModel.find({}).sort(sortBy)
            .then((stock) => {
                if (stock) {
                    return stock;
                } else {
                    throw new Error('No stock found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding and sorting stock: ' + err.message);
            });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            StockModel.findById(id)
                .then((stock) => {
                    if (stock) {
                        resolve(stock);
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    function findByName(name) {
        return StockModel.findOne({ name: name })
            .then((stock) => {
                if (stock) {
                    return stock;
                } else {
                    throw new Error('Stock not found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding stock: ' + err.message);
            });
    }

    /**
     * Updates a stock item.
     * @param {string} id - The ID of the stock item to be updated.
     * @param {Object} values - The updated values for the stock item.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function update(id, values) {
        return new Promise(function(resolve, reject) {
            StockModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Stock updated');
                    } else {
                        reject(new Error('No changes made to the stock'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    function updateByName(name, values) {
        return new Promise(function(resolve, reject) {
            StockModel.updateOne({name: name}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Stock updated');
                    } else {
                        reject(new Error('No changes made to the stock'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Deletes a stock item.
     * @param {string} id - The ID of the stock item to be deleted.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function deleteStockItem(id) {
        return new Promise(function(resolve, reject) {
            StockModel.deleteOne({_id: id})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Stock deleted');
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    function deleteStockItemByName(name) {
        return new Promise(function(resolve, reject) {
            StockModel.deleteOne({name: name})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Stock deleted');
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    return controller;
}

module.exports = StockController;