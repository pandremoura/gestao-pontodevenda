const express = require("express");
const validarLogin = require("../intermediarios/validarLogin");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaPedido = require("../validaçoes/schemaPedido");
const cadastrarPedido = require("../controladores/pedidos/cadastrarPedido");
const listarPedidos = require("../controladores/pedidos/listarPedidos");

const rotasPedidos = express();

rotasPedidos.use(validarLogin);

rotasPedidos.post("/pedido", validarCorpoRequisicao(schemaPedido), cadastrarPedido);
rotasPedidos.get("/pedido", listarPedidos);

module.exports = rotasPedidos;