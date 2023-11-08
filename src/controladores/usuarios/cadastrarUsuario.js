const knex = require("../../conexoes/postgres");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await knex("usuarios").where({ email }).first();
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);

    const novoUsuario = {
      nome: nomeFormatado.trim(),
      email,
      senha: senhaCriptografada
    };

    const usuarioInserido = await knex("usuarios").insert(novoUsuario).returning("*");
    const { senha: _, ...usuario } = usuarioInserido[0];

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = cadastrarUsuario;