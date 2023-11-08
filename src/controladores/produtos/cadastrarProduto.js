const knex = require("../../conexoes/postgres");
const { uploadFile } = require('../../utils/storage')

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;

  try {
    const categoriaExiste = await knex("categorias").select("id").where({ id: categoria_id }).first();

    if (!categoriaExiste) {
      return res.status(400).json({ mensagem: "Categoria não encontrada." });
    }

    const descricaoFormatada = descricao.charAt(0).toUpperCase() + descricao.slice(1);

    const novoProduto = {
      descricao: descricaoFormatada.trim(),
      quantidade_estoque,
      valor,
      categoria_id
    }

    let arquivo = null;

    if (file) {
      arquivo = await uploadFile(
        `imagens/${file.originalname}`,
        file.buffer,
        file.mimetype
      );

      novoProduto.produto_imagem = arquivo.url;
    }

    const produtoInserido = await knex("produtos").insert(novoProduto).returning("*");
    const produto = produtoInserido[0];

    return res.status(201).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = cadastrarProduto;