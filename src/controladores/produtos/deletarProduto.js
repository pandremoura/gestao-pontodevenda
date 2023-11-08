const knex = require("../../conexoes/postgres");
const { deleteFile } = require("../../utils/storage")

const deletarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex("produtos").where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const produtoVinculado = await knex("pedido_produtos").where({ produto_id: id }).first();

        if (produtoVinculado) {
            return res.status(400).json({ mensagem: "O produto está vinculado a um pedido e não pode ser excluído." });
        }

        const path = produtoExiste.produto_imagem.slice(produtoExiste.produto_imagem.indexOf("imagens"));

        if (produtoExiste.produto_imagem) {
            await deleteFile(path);
        }

        await knex("produtos").where({ id }).del();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = deletarProduto;