CREATE TABLE usuarios (
	id serial PRIMARY KEY,
  	nome text NOT NULL,
  	email text NOT NULL UNIQUE,
  	senha text NOT NULL
);

CREATE TABLE categorias (
	id serial PRIMARY KEY,
  	descricao text NOT NULL
);

INSERT INTO categorias (descricao)
VALUES 
    ('Informática'), 
    ('Celulares'), 
    ('Beleza e Perfumaria'), 
    ('Mercado'), 
    ('Livros e Papelaria'), 
    ('Brinquedos'), 
    ('Moda'), 
    ('Bebê'), 
    ('Games');

CREATE TABLE produtos (
	id serial PRIMARY KEY,
    descricao text NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
    categoria_id INT REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id serial PRIMARY KEY,
  	nome text NOT NULL,
  	email text NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    cep text,
    rua text,
    numero int,
    bairro text,
    cidade text,
    estado text
);

CREATE TABLE pedidos (
	id serial PRIMARY KEY,
  	cliente_id INT REFERENCES clientes(id),
  	observacao text,
  	valor_total INT
);

CREATE TABLE pedido_produtos (
    id serial PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade_produto INT NOT NULL,
    valor_produto INT NOT NULL
);
	
ALTER TABLE produtos
ADD produto_imagem text;