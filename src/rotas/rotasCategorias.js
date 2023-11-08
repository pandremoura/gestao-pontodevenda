const express = require("express");
const listarCategorias = require("../controladores/categorias/listarCategorias");

const rotasCategorias = express();

rotasCategorias.get("/categoria", listarCategorias);

module.exports = rotasCategorias;