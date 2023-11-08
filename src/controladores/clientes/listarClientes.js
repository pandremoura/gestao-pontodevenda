const knex = require("../../conexoes/postgres");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes").select();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
}

module.exports = listarClientes;