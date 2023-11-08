const knex = require("../../conexoes/postgres");
const compiladorHtml = require("../../utils/compiladorHtml");
const transportador = require("../../conexoes/nodemailer");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clienteExiste = await knex("clientes").where({ id: cliente_id }).first();

    if (!clienteExiste) {
      return res.status(400).json({ mensagem: "Cliente não encontrado." });
    }

    const produtoIds = pedido_produtos.map((produto) => produto.produto_id);

    const produtosExistentes = await knex("produtos").select("id", "quantidade_estoque").whereIn("id", produtoIds);

    if (produtosExistentes.length !== produtoIds.length) {
      return res.status(400).json({ mensagem: "Um ou mais produtos não foram encontrados." });
    }

    let i = 0;

    for (const produto of produtosExistentes) {
      const { quantidade_estoque } = produto;
      if (quantidade_estoque < pedido_produtos[i].quantidade_produto) {
        return res.status(400).json({ mensagem: "Produto sem estoque suficiente." });
      }
      i++;
    }

    const novoPedido = {
      cliente_id,
      observacao,
    };

    let valorTotal = 0;
    let valorTotalPorProduto = 0;
    let quantidadeEmEstoque = 0;

    const pedidoInserido = await knex.transaction(async (trx) => {
      const [pedidoId] = await trx.insert(novoPedido).into("pedidos").returning("id");

      for (const produtoDoPedido of pedido_produtos) {
        const { produto_id, quantidade_produto } = produtoDoPedido;

        const resultadoProduto = await trx.select("valor", "quantidade_estoque").from("produtos").where({ id: produto_id }).first();

        quantidadeEmEstoque = resultadoProduto.quantidade_estoque - quantidade_produto;

        await knex("produtos").where({ id: produto_id }).first().update("quantidade_estoque", quantidadeEmEstoque);

        const { valor } = resultadoProduto;

        valorTotalPorProduto = valor * quantidade_produto;
        valorTotal += valorTotalPorProduto;

        if (resultadoProduto) {
          const pedidoProduto = {
            pedido_id: pedidoId.id,
            produto_id,
            quantidade_produto,
            valor_produto: valor,
          };

          await trx.insert(pedidoProduto).into("pedido_produtos");
        }
      }

      await trx.commit();

      await knex("pedidos").where("id", "=", pedidoId.id).update("valor_total", valorTotal);
    });

    const cliente = await knex("clientes").select("nome", "email").where({ id: cliente_id }).first();

    const { nome, email } = cliente;

    const htmlNewsletter = await compiladorHtml(
      "./src/templates/newsletter.html",
      {
        usuario: nome,
      }
    );

    transportador.sendMail({
      from: `DevFusion <${process.env.EMAIL_FROM}>`,
      to: `${nome} <${email}>`,
      subject: "Confirmação de Pedido",
      html: htmlNewsletter,
    });

    return res.status(201).json(pedidoInserido);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = cadastrarPedido;