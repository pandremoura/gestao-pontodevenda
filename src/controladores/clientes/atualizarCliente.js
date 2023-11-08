const knex = require("../../conexoes/postgres");

const atualizarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        const clienteExiste = await knex("clientes").where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." });
        }

        if (email !== clienteExiste.email) {
            const emailClienteExistente = await knex("clientes").where({ email }).first();
            if (emailClienteExistente) {
                return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." });
            }
        }

        if (cpf !== clienteExiste.cpf) {
            const cpfClienteExistente = await knex("clientes").where({ cpf }).first();
            if (cpfClienteExistente) {
                return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o cpf informado." });
            }
        }

        const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);

        const clienteAtualizado = {
            nome: nomeFormatado.trim(),
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }

        await knex("clientes").where({ id }).update(clienteAtualizado).returning("*");

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = atualizarCliente;