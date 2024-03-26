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
            // UpdateOne function will update the document that matches the filter
            StockModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.nModified > 0) {
                        resolve('Stock updated');
                    } else {
                        // If nModified is 0, it means the document wasn't found or no changes were made
                        reject(new Error('Stock not found or no changes made'));
                    }
                })
                .catch(err => {
                    reject(err); // Handle any errors that occur during the update operation
                });
        });
    }

    
    return controller;
    }

module.exports = StockController;