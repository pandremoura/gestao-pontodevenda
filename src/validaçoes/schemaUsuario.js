const joi = require("joi");

const schemaUsuario = joi.object({
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

  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.base": "O campo senha deve ser preenchido com um texto"
  }),
});

module.exports = schemaUsuario;