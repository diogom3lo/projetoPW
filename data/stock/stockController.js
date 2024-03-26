function StockController(StockModel) {
    let controller = {
        create,
        findAll,
        update
    }

    function create (values){
        let newStock = StockModel(values);
        return save(newStock);
    }
    
    function save(newStock){
        return new Promise(function(resolve, reject){
            newStock.save()
                .then(() => {
                    resolve('Stock created');
                })
                .catch((err) => {
                    reject(err);
            });
        });
    
    }
    function findAll(){
        return new Promise(function(resolve, reject){
            StockModel.find({})
                .then((stock) => {
                    resolve(stock);
                })
                .catch((err) => {
                    reject(err);
            });
        });
    }

    function update(id, values){
        return new Promise(function(resolve, reject) {
            // First, check if the document exists
            StockModel.findById(id)
                .then(doc => {
                    if (!doc) {
                        // No document found with that ID
                        reject(new Error('Stock not found'));
                    } else {
                        // Document exists, attempt to update
                        StockModel.updateOne({_id: id}, values)
                            .then(result => {
                                if (result.nModified > 0) {
                                    resolve('Stock updated');
                                } else {
                                    // Document was found but no changes were made
                                    reject(new Error('No changes made to the stock'));
                                }
                            })
                            .catch(err => {
                                reject(err); // Handle any errors that occur during the update operation
                            });
                    }
                })
                .catch(err => {
                    reject(err); // Handle any errors that occur during the findById operation
                });
        });
    }

    
    return controller;
    }

module.exports = StockController;