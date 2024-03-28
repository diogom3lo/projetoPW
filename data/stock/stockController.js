function StockController(StockModel) {
    let controller = {
        create,
        findAll,
        update,
        deleteStockItem
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
            StockModel.updateOne({_id: id}, values)
                .then(result => {
                    if (result.modifiedCount > 0) {
                        resolve('Stock updated');
                    } else {
                        // This condition will now correctly reflect no actual modification was done,
                        // though it should not be reached if `modifiedCount` is 1 as per your result.
                        reject(new Error('No changes made to the stock'));
                    }
                })
                .catch(err => {
                    reject(err); // Handle any errors that occur during the update operation
                });
        });
    }

    function deleteStockItem(id){
        return new Promise(function(resolve, reject){
            StockModel.deleteOne({_id: id})
                .then(result => {
                    if (result.deletedCount > 0) {
                        resolve('Stock deleted');
                    } else {
                        reject(new Error('Stock not found'));
                    }
                })
                .catch(err => {
                    reject(err); // Handle any errors that occur during the delete operation
                });
        });
    }

    
    return controller;
    }

module.exports = StockController;