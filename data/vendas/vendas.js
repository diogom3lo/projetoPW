const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendasSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true }, // Adicione o campo productName
    quantidade: { type: Number, required: true },
    quantidadeAnterior: { type: Number, required: true },
    quantidadeAtualizada: { type: Number, required: true },
    dataVenda: { type: Date, default: Date.now }
});

const Vendas = mongoose.model('Vendas', VendasSchema);

module.exports = Vendas;

