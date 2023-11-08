const knex = require("../../conexoes/postgres");

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex("produtos").where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        return res.status(200).json(produtoExiste);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = detalharProduto;