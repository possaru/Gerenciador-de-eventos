CREATE DATABASE gerenciador_DB;
USE gerenciador_DB;
CREATE TABLE usuarios(
    ID int PRIMARY KEY AUTO_INCREMENT,
    login varchar(255) NOT NULL,
    senha varchar(255) NOT NULL,
    nome varchar(255) NOT NULL,
    função varchar(255),
    expediente varchar(255),
    acesso varchar(2550),
    telefone varchar(255),
    UNIQUE (ID),
    unique(login)
);
INSERT INTO usuarios(login, senha, nome, função, expediente, telefone)
VALUES (
        'dev1',
        'senhadev1',
        'usuarioA',
        'organizador',
        'manhã',
        '+5513164887552'
    );
INSERT INTO usuarios(login, senha, nome, função, expediente, telefone)
VALUES (
        'dev2',
        'senhadev2',
        'usuarioB',
        'organizador',
        'tarde',
        '+5513164887552'
    );
CREATE TABLE contatos(
    ID int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    serviço varchar(255),
    valor_base varchar(255),
    valor_tipo varchar(255),
    disponibilidade varchar(255),
    telefone varchar(255),
    UNIQUE (ID)
);
INSERT INTO contatos (
        nome,
        serviço,
        valor_base,
        valor_tipo,
        disponibilidade,
        telefone
    )
VALUES (
        'fulano',
        'musico',
        'R$300',
        'diaria',
        'quartas',
        '+5513123456789'
    ),
    (
        'cicrano',
        'fotografo',
        'R$500',
        'diaria',
        'quartas',
        '+5513123456789'
    ),
    (
        'beltrano',
        'chef',
        'R$680',
        'diaria',
        'quartas',
        '+5513123456789'
    ),
    (
        'altrano',
        'garçom',
        'R$300',
        'diaria',
        'quartas',
        '+5513123456789'
    ),
    (
        'deltrano',
        'garçom',
        'R$300',
        'diaria',
        'quartas',
        '+5513123456789'
    ),
    (
        'meltrano',
        'maquiagista',
        'R$720',
        'diaria',
        'quartas',
        '+5513123456789'
    );
CREATE TABLE eventos(
    ID int PRIMARY KEY AUTO_INCREMENT,
    cliente varchar(255) NOT NULL,
    data varchar(255),
    local varchar(255),
    tipo varchar(255),
    convidados int,
    responsável varchar(255),
    UNIQUE (ID)
);
INSERT INTO eventos (
        cliente,
        data,
        local,
        tipo,
        convidados,
        responsável
    )
VALUES (
        'clienteA',
        '12/12/2026',
        'Casa de Eventos',
        'aniversario',
        '29',
        'usuarioA'
    ),
    (
        'clienteB x Esposa',
        '27/08/2026',
        'Jardim Municipal',
        'Festa pós-casamento',
        '107',
        'usuarioB'
    );