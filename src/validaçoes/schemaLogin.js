const joi = require("joi");

const schemaLogin = joi.object({
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
    })
});

module.exports = schemaLogin;