const Vendas = require('./vendas');
const Product = require('../product');

// vendasController.js
async function registrarVenda(productId, quantidade) {
    try {
        // Encontrar o produto pelo ID
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        // Verificar se a quantidade é válida
        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade de venda inválida');
        }

        // Verificar se há quantidade suficiente do produto
        if (product.number < quantidade) {
            throw new Error('Quantidade de produto insuficiente');
        }

        // Calcular a quantidade anterior e a quantidade atualizada
        const quantidadeAnterior = product.number;
        const quantidadeAtualizada = product.number - quantidade;

        // Atualizar o número de produtos no banco de dados
        product.number = quantidadeAtualizada;
        await product.save();

        // Criar uma nova venda com as informações
        const venda = new Vendas({
            productId: productId,
            productName: product.name, // Adicionar o nome do produto aqui
            quantidade: quantidade,
            quantidadeAnterior: quantidadeAnterior,
            quantidadeAtualizada: quantidadeAtualizada
        });

        // Salvar a venda no banco de dados
        await venda.save();

        return 'Venda registrada com sucesso';
    } catch (error) {
        throw error;
    }
}

async function registrarVendaNome(produtoNome, quantidade) {
    try {
        // Buscar o produto pelo nome
        const product = await Product.findByName(produtoNome);

        // Verificar se o produto foi encontrado
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        // Verificar se a quantidade é válida
        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade de venda inválida');
        }

        // Verificar se há quantidade suficiente do produto
        if (product.number < quantidade) {
            throw new Error('Quantidade de produto insuficiente');
        }
        
        // Calcular a quantidade anterior e a quantidade atualizada
        const quantidadeAnterior = product.number;
        const quantidadeAtualizada = quantidadeAnterior - quantidade;

        // Atualizar o número de produtos no banco de dados
        product.number = quantidadeAtualizada;
        await product.save();

        // Criar uma nova venda com as informações
        const venda = new Vendas({
            produtoNome: produtoNome,
            quantidade: quantidade,
            quantidadeAnterior: quantidadeAnterior,
            quantidadeAtualizada: quantidadeAtualizada
        });

        // Salvar a venda no banco de dados
        await venda.save();

        return 'Venda registrada com sucesso';
    } catch (error) {
        throw error;
    }
}




module.exports = { registrarVenda, registrarVendaNome };

