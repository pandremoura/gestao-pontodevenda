const express = require("express");
const validarLogin = require("../intermediarios/validarLogin");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaCliente = require("../validaçoes/schemaCliente");
const cadastrarcliente = require("../controladores/clientes/cadastrarCliente");
const atualizarCliente = require("../controladores/clientes/atualizarCliente");
const detalharCliente = require("../controladores/clientes/detalharCliente");
const listarClientes = require("../controladores/clientes/listarClientes");

const rotasClientes = express();

rotasClientes.use(validarLogin);

rotasClientes.post("/cliente", validarCorpoRequisicao(schemaCliente), cadastrarcliente);
rotasClientes.get("/cliente", listarClientes);
rotasClientes.put("/cliente/:id", validarCorpoRequisicao(schemaCliente), atualizarCliente);
rotasClientes.get("/cliente/:id", detalharCliente);

module.exports = rotasClientes;