const knex = require("../../conexoes/postgres");

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        let query = knex("pedidos");

        if (cliente_id) {
            const clienteExiste = await knex("clientes").select("id").where({ id: cliente_id }).first();

            if (!clienteExiste) {
                return res.status(400).json({ mensagem: "Cliente não encontrado." });
            }

            query = query.where({ cliente_id });
        }

        const pedidos = await query.select();

        const pedidosComProdutos = await Promise.all(
            pedidos.map(async (pedido) => {
                const produtos = await knex("pedido_produtos").where({ pedido_id: pedido.id }).select();

                const listaDePedidos = {
                    pedido,
                    pedido_produtos: produtos,
                };

                return listaDePedidos;
            })
        );

        if (pedidosComProdutos.length < 1) {
            return res.status(400).json({ mensagem: "Não há pedidos cadastrados para o cliente informado." });
        }

        return res.status(200).json(pedidosComProdutos);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = listarPedidos;