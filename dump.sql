create database dinogestor;

create table usuarios (
    usuario_id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null,
    funcao text not null
);

create table produtos (
    produto_id serial primary key,
    nome text not null unique,
    descricao text,
    estoque integer,
    preco integer not null,
    categoria_id integer references produtos_categorias(id)
);

create table produtos_categorias (
    id serial primary key,
    categoria_nome text not null
);

create table clientes (
    cliente_id serial primary key,
    nome text not null,
    email text not null unique,
    telefone text not null,
    data_nascimento date not null
);

create table vendas (
    venda_id serial primary key,
    cliente_id integer references clientes(cliente_id),
    usuario_id integer references usuarios(usuario_id),
    data_venda timestamp not null default now(), --current_timestamp,
    valor_total integer not null
);

create table itens_venda (
    item_id serial primary key,
    venda_id integer references vendas(venda_id),
    produto_id integer references produtos(produto_id),
    quantidade integer not null,
    preco_unitario integer not null
);

insert into produto_categorias (categoria_nome)
VALUES 
    ('Burger Clássico'), 
    ('Burger Artesanal'), 
    ('Porção'), 
    ('Bebida'), 
    ('Sobremesa'), 
    ('Milk Shake')