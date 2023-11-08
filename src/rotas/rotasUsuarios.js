const express = require("express");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const validarLogin = require("../intermediarios/validarLogin");
const schemaUsuario = require("../validaçoes/schemaUsuario");
const schemaLogin = require("../validaçoes/schemaLogin");
const cadastrarUsuario = require("../controladores/usuarios/cadastrarUsuario");
const efetuarLogin = require("../controladores/usuarios/efetuarLogin");
const detalharUsuario = require("../controladores/usuarios/detalharUsuario");
const atualizarUsuario = require("../controladores/usuarios/atualizarUsuario");

const rotasUsuarios = express();

rotasUsuarios.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario);
rotasUsuarios.post("/login", validarCorpoRequisicao(schemaLogin), efetuarLogin);

rotasUsuarios.use(validarLogin);

rotasUsuarios.get("/usuario", detalharUsuario);
rotasUsuarios.put("/usuario", validarCorpoRequisicao(schemaUsuario), atualizarUsuario);

module.exports = rotasUsuarios;