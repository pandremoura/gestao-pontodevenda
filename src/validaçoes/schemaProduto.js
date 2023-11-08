const joi = require("joi");

const schemaProduto = joi.object({
    descricao: joi.string().trim().min(1).required().messages({
        "any.required": "O campo descricao é obrigatório",
        "string.empty": "O campo descricao é obrigatório",
        "string.base": "O campo descricao deve ser preenchido com um texto"
    }),

    quantidade_estoque: joi.number().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório",
        "number.empty": "O campo quantidade_estoque é obrigatório",
        "number.base": "O campo quantidade_estoque deve ser preenchido com um número"
    }),

    valor: joi.number().required().messages({
        "any.required": "O campo valor é obrigatório",
        "number.empty": "O campo valor é obrigatório",
        "number.base": "O campo valor deve ser preenchido com um número"
    }),

    categoria_id: joi.number().required().messages({
        "any.required": "O campo categoria_id é obrigatório",
        "number.empty": "O campo categoria_id é obrigatório",
        "number.base": "O campo categoria_id deve ser preenchido com um número"
    }),
    
    produto_imagem: joi.string().allow("")

});

module.exports = schemaProduto;