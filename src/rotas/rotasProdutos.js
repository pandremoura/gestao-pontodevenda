const express = require("express");
const multer = require('../conexoes/multer');

const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaProduto = require("../validaçoes/schemaProduto");
const cadastrarProduto = require("../controladores/produtos/cadastrarProduto");
const listarProdutos = require("../controladores/produtos/listarProdutos");
const detalharProduto = require("../controladores/produtos/detalharProduto");
const atualizarProduto = require("../controladores/produtos/atualizarProduto");
const deletarProduto = require("../controladores/produtos/deletarProduto");
const validarLogin = require("../intermediarios/validarLogin");

const rotasProdutos = express();

rotasProdutos.use(validarLogin);

rotasProdutos.post("/produto", multer.single('produto_imagem'), validarCorpoRequisicao(schemaProduto), cadastrarProduto);
rotasProdutos.get("/produto", listarProdutos);
rotasProdutos.get("/produto/:id", detalharProduto);
rotasProdutos.put("/produto/:id", multer.single('produto_imagem'), validarCorpoRequisicao(schemaProduto), atualizarProduto);
rotasProdutos.delete("/produto/:id", deletarProduto);

module.exports = rotasProdutos;