/**
 * ProductController handles the CRUD operations for the stock.
 * @param {Object} ProductModel - The model representing the stock.
 * @returns {Object} - The controller object with CRUD methods.
 */
function ProductController(ProductModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        deleteProductItem,
        findByName,
        updateByName,
        deleteProductItemByName,
        findAllAndSort
    }

    /**
     * Creates a new stock item.
     * @param {Object} values - The values for the new stock item.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function create(values) {
        let newProduct = ProductModel(values);
        return save(newProduct);
    }

    /**
     * Saves the stock item to the database.
     * @param {Object} newProduct - The stock item to be saved.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function save(newProduct) {
        return new Promise(function(resolve, reject) {
            newProduct.save()
                .then(() => {
                    resolve('Product created');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
    /**
     * Finds all products items.
     * @returns {Promise} - A promise that resolves with an array of product items or rejects with an error.
     */
    function findAll() {
        return new Promise(function(resolve, reject) {
            ProductModel.find({})
                .then((product) => {
                    resolve(product);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    function findAllAndSort(sortBy) {
        return ProductModel.find({}).sort(sortBy)
            .then((product) => {
                if (product) {
                    return product;
                } else {
                    throw new Error('No product found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding and sorting product: ' + err.message);
            });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            ProductModel.findById(id)
                .then((product) => {
                    if (product) {
                        resolve(product);
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    function findByName(name) {
        return ProductModel.findOne({ name: name })
            .then((product) => {
                if (product) {
                    return product;
                } else {
                    throw new Error('Product not found');
                }
            })
            .catch((err) => {
                throw new Error('Error finding product: ' + err.message);
            });
    }

    /**
     * Updates a product item.
     * @param {string} id - The ID of the product item to be updated.
     * @param {Object} values - The updated values for the product item.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function update(id, values) {
        return new Promise(function(resolve, reject) {
            ProductModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Product updated');
                    } else {
                        reject(new Error('No changes made to the product'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    function updateByName(name, values) {
        return new Promise(function(resolve, reject) {
            ProductModel.updateOne({name: name}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Product updated');
                    } else {
                        reject(new Error('No changes made to the product'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Deletes a product item.
     * @param {string} id - The ID of the product item to be deleted.
     * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
     */
    function deleteProductItem(id) {
        return new Promise(function(resolve, reject) {
            ProductModel.deleteOne({_id: id})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Product deleted');
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    function deleteProductItemByName(name) {
        return new Promise(function(resolve, reject) {
            ProductModel.deleteOne({name: name})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Product deleted');
                    } else {
                        reject(new Error('Product not found'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    return controller;
}

module.exports = ProductController;