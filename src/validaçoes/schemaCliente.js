const joi = require("joi");

const schemaCliente = joi.object({
  nome: joi.string().trim().min(1).required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.base": "O campo nome deve ser preenchido com um texto"
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa conter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.base": "O campo email deve ser preenchido com um texto"
  }),

  cpf: joi.string().trim().length(11).required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf é obrigatório",
    "string.base": "O campo cpf deve ser preenchido com um texto",
    "string.length": "o campo cpf deve conter 11 caracteres"
  }),
  cep: joi.string().allow(""),
  rua: joi.string().allow(""),
  numero: joi.allow(""),
  bairro: joi.string().allow(""),
  cidade: joi.string().allow(""),
  estado: joi.string().allow("")
});

module.exports = schemaCliente;