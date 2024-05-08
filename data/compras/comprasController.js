const Compras = require('./compras');
const Product = require('../product');


async function registrarCompras(productId, quantidade) {
    try {
        // Encontrar o produto pelo ID
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Produto não encontrado');
        }

       
        
        const quantidadeAnterior = product.number;
        const quantidadeAtualizada = product.number + quantidade;

        // Atualizar o número de produtos no banco de dados
        product.number = quantidadeAtualizada;
        await product.save();

        // Criar uma nova venda com as informações
        const compra = new Compras({
            productId: productId,
            productName: product.name, // Adicionar o nome do produto aqui
            quantidade: quantidade,
            quantidadeAnterior: quantidadeAnterior,
            quantidadeAtualizada: quantidadeAtualizada
        });

        // Salvar a venda no banco de dados
        await compra.save();

        return 'Compra registrada com sucesso';
    } catch (error) {
        throw error;
    }
}

async function registrarComprasNome(produtoNome, quantidade) {
    try {
        // Buscar o produto pelo nome
        const product = await Product.findByName(produtoNome);

        // Verificar se o produto foi encontrado
        if (!product) {
            throw new Error('Produto não encontrado');
        }

       
        
        // Calcular a quantidade anterior e a quantidade atualizada
        const quantidadeAnterior = product.number;
        const quantidadeAtualizada = quantidadeAnterior + quantidade;

        // Atualizar o número de produtos no banco de dados
        product.number = quantidadeAtualizada;
        await product.save();

        // Criar uma nova venda com as informações
        const compra = new Compras({
            produtoNome: produtoNome,
            quantidade: quantidade,
            quantidadeAnterior: quantidadeAnterior,
            quantidadeAtualizada: quantidadeAtualizada
        });

        // Salvar a venda no banco de dados
        await compra.save();

        return 'Compra registrada com sucesso';
    } catch (error) {
        throw error;
    }
}




module.exports = { registrarCompras, registrarComprasNome };

