const knex = require("../../conexoes/postgres");

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const categoriaExiste = await knex("categorias").select("id").where({ id: categoria_id }).first();

      if (!categoriaExiste) {
        return res.status(400).json({ mensagem: "Categoria não encontrada." });
      }

      const listaDeProdutosComFiltro = await knex("produtos").where({ categoria_id });

      if (listaDeProdutosComFiltro.length < 1) {
        return res.status(400).json({ mensagem: "Não há produtos cadastrados na categoria informada." });
      }

      return res.status(200).json(listaDeProdutosComFiltro);
    }

    const listaDeProdutos = await knex("produtos").select();

    return res.status(200).json(listaDeProdutos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = listarProdutos;