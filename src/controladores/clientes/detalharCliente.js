const knex = require("../../conexoes/postgres");

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteExiste = await knex("clientes").where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." });
        }

        return res.status(200).json(clienteExiste);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = detalharCliente;