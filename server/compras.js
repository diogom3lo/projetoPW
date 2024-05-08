const bodyParser = require('body-parser');
const express = require('express');
const Compras = require('./compras');
const ComprasController = require('../data/compras/comprasController');

function ComprasRouter() {
    const router = express.Router();

    router.use(bodyParser.json());

    router.post('/', async (req, res, next) => {
        try {
            const { productId, quantidade } = req.body;
            const message = await ComprasController.registrarCompras(productId, quantidade);
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    });

    // vendasRouter.js

router.route('/nome/:nome')
.post(function(req, res, next){
    const nomeProduto = req.params.nome;
    const quantidade = req.body.quantidade;

    ComprasController.registrarComprasNome(nomeProduto, quantidade)
    .then((mensagem) => {
        res.status(200).send(mensagem);
        next();
    })
    .catch((err) => {
        res.status(400).send(err.message);
        next(err); // Passar o erro para o middleware de tratamento de erro
    });
});


    return router;
}

module.exports = ComprasRouter;
