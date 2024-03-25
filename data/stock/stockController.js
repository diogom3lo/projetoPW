function StockController(StockModel) {
    let controller = {
        create,
        findAll
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
    
    return controller;
    }

module.exports = StockController;