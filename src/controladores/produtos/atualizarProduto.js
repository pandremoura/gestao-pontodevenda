const knex = require("../../conexoes/postgres");
const { uploadFile, deleteFile } = require('../../utils/storage')

const atualizarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;
    const { file } = req;

    try {
        const produtoExiste = await knex("produtos").where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const categoriaExiste = await knex("categorias").select("id").where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(400).json({ mensagem: "Categoria não encontrada." });
        }

        const descricaoFormatada = descricao.charAt(0).toUpperCase() + descricao.slice(1);

        const produtoAtualizado = {
            descricao: descricaoFormatada.trim(),
            quantidade_estoque,
            valor,
            categoria_id
        }

        if (file) {
            const arquivo = await uploadFile(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype
            );

            const path = produtoExiste.produto_imagem.slice(produtoExiste.produto_imagem.indexOf("imagens"));

            if (produtoExiste.produto_imagem) {
                await deleteFile(path);
            }

            produtoAtualizado.produto_imagem = arquivo.url;
        }

        await knex("produtos").where({ id }).update(produtoAtualizado).returning("*");

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = atualizarProduto;