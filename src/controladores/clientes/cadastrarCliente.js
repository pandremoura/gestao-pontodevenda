const knex = require("../../conexoes/postgres");

const cadastrarcliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    let clienteExiste = await knex("clientes").where({ email }).first();

    if (clienteExiste) {
      return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." });
    }

    clienteExiste = await knex("clientes").where({ cpf }).first();

    if (clienteExiste) {
      return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o cpf informado." });
    }

    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);

    const novoCliente = {
      nome: nomeFormatado.trim(),
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    };

    const clienteInserido = await knex("clientes").insert(novoCliente).returning("*");
    const cliente = clienteInserido[0];

    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  };
};

module.exports = cadastrarcliente;