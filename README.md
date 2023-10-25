# ATENÇÃO API EM CONSTRUÇÃO


# Dino Gestor - Software de Gestão para Restaurantes

Neste repositório você encontra o backend de um software de código aberto projetado para ajudar restaurantes a gerenciar eficientemente suas operações, desde a gestão de produtos e vendas até relatórios detalhados e controle de acesso baseado em funções.

## Recursos Principais

- **Gestão de Produtos:** Cadastre, atualize, exclua e liste produtos em seu menu.
- **Gestão de Vendas:** Registre vendas, acompanhe pedidos e gerencie pagamentos.
- **Relatórios Avançados:** Acesse relatórios de vendas diárias, mensais, relatórios de estoque, lucratividade e muito mais.
- **Controle de Acesso Baseado em Funções:** Garanta que cada membro da equipe tenha as permissões apropriadas no sistema.
- **Configurações Personalizadas:** Ajuste configurações gerais, de impressão, de impostos e notificações de acordo com suas necessidades.


## Utilização

Para instalar e executar o Dino Gestor, você precisará ter as seguintes tecnologias e bibliotecas instaladas:

- [Node.js](https://nodejs.org/): O software é desenvolvido em JavaScript e requer o Node.js para ser executado.
- [Express](https://expressjs.com/): Utilizado para criar a aplicação web e gerenciar rotas.
- [PostgreSQL](https://www.postgresql.org/): O Dino Gestor usa o PostgreSQL como banco de dados. Você pode configurá-lo por meio do serviço [ElephantSQL](https://www.elephantsql.com/).
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Utilizado para criptografar senhas.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken): Para autenticação baseada em tokens.
- [Knex](https://knexjs.org/): Um construtor de consultas SQL para interagir com o banco de dados.
- [Nodemailer](https://nodemailer.com/): Para enviar e-mails de notificação.
- [Handlebars](https://handlebarsjs.com/): Um mecanismo de modelo para criar e-mails personalizados.
- [dotenv](https://www.npmjs.com/package/dotenv): Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- Entre outras que você encontra no arquivo package.json.

Certifique-se de instalar todas essas dependências antes de prosseguir com a instalação do Dino Gestor.



## Configuração do Controle de Acesso Baseado em Funções

1. Administrador: Tem acesso completo a todas as funcionalidades do sistema, incluindo a capacidade de gerenciar usuários, configurações e permissões.

2. Atendente de Caixa: Pode criar vendas, processar pedidos e gerenciar pagamentos.

3. Cozinheiro: Pode ver os pedidos da cozinha e marcar os pedidos como concluídos.

4. Gerente de Estoque: Gerencia o estoque de produtos, adicionando ou removendo itens e atualizando os níveis de estoque.

5. Gerente de RH: Pode gerenciar informações sobre funcionários, como admissões, demissões e alterações de função.

6. Gerente de Relatórios: Tem acesso aos relatórios e estatísticas do sistema.


## Contribuição

Aceitamos contribuições! Se você deseja melhorar o Dino Gestor, siga estas etapas:

1. Fork o repositório.
2. Crie uma branch para sua contribuição (`git checkout -b feature/nova-funcionalidade`).
3. Faça as alterações desejadas e adicione uma documentação apropriada.
4. Envie um pull request.

## Suporte

Se você encontrar problemas ou tiver dúvidas, sinta-se à vontade para criar uma "Issue" neste repositório. Estou aqui para ajudar!

## Licença

Este software é um projeto independente desenvolvido por mim, Paulo André Pinto. Todos os direitos autorais são reservados e a distribuição ou uso deste software sem autorização é proibido. Este software não é fornecido com uma licença pública e não está aberto para redistribuição ou modificação sem permissão expressa do autor.

Para obter informações sobre como obter permissão para usar ou contribuir para este projeto, entre em contato pelo email p.andre.moura@gmail.com