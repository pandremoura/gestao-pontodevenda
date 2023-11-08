require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rotasCategorias = require("./rotas/rotasCategorias");
const rotasUsuarios = require("./rotas/rotasUsuarios");
const rotasProdutos = require("./rotas/rotasProdutos");
const rotasClientes = require("./rotas/rotasClientes");
const rotasPedidos = require("./rotas/rotasPedidos");

const app = express();

app.use(cors());
app.use(express.json());

app.use(rotasCategorias);
app.use(rotasUsuarios);
app.use(rotasProdutos);
app.use(rotasClientes);
app.use(rotasPedidos);

app.listen(process.env.PORT);