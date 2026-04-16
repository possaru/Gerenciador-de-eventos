CREATE DATABASE gerenciador_DB;
USE gerenciador_DB;

-- =====================
-- TABELA USUARIOS
-- =====================
CREATE TABLE usuarios(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    funcao VARCHAR(255),
    expediente VARCHAR(255),
    acesso VARCHAR(255),
    telefone VARCHAR(255),
    UNIQUE (ID),
    UNIQUE (login)
);

INSERT INTO usuarios(login, senha, nome, funcao, expediente, telefone)
VALUES 
('dev1', 'senhadev1', 'usuarioA', 'organizador', 'manhã', '+5513164887552'),
('dev2', 'senhadev2', 'usuarioB', 'organizador', 'tarde', '+5513164887552');

-- =====================
-- TABELA CONTATOS
-- =====================
CREATE TABLE contatos(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    tipo_servico VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(255),
    IE VARCHAR(255),
    wsite VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(255),
    UNIQUE (ID)
);

INSERT INTO contatos (
   tipo_servico, nome, cnpj, IE, wsite, email, telefone
)
VALUES 
('Buffet','Ayla e Marcos Doces & Salgados Ltda', '47.479.616/0001-50', '566.613.469.202', 'www.aylaemarcosdocessalgadosltda.com.br', 'atendimento@aylaemarcosdocessalgadosltda.com.br', '16 2767-1158'),
('Buffet','Marcos Vinicius e Levi Doces & Salgados ME', '16.304.840/0001-88', '320.721.346.238', 'www.marcosviniciuselevidocessalgadosme.com.br', 'compras@marcosviniciuselevidocessalgadosme.com.br', '11 2968-4926'),
('Buffet','Antonio e Sueli Paes e Doces ME', '20.684.071/0001-68', '61.408.677.867', 'www.antonioesuelipaesedocesme.com.br', 'cobranca@antonioesuelipaesedocesme.com.br', '11 3693-8741'),
('Buffet','Caue e Antonio Buffet Ltda', '35.786.583/0001-02', '451.543.246.229', 'www.caueeantoniobuffetltda.com.br', 'estoque@caueeantoniobuffetltda.com.br', '11 2784-7484'),
('Buffet','Giovanna e Felipe Buffet ME', '52.323.356/0001-60', '426.809.487.961', 'www.giovannaefelipebuffetme.com.br', 'financeiro@giovannaefelipebuffetme.com.br', '11 3900-8232'),
('Local','Vera e Gael Casa Noturna ME', '74.558.435/0001-92', '848.042.536.299', 'www.veraegaelcasanoturname.com.br', 'financeiro@veraegaelcasanoturname.com.br', '11 3602-8379'),
('Local','Gouveia Mata Eventos EPP', '71.987.690/0001-62', '03.388.599-0', 'www.eventosgouveia.com.br', 'eventos.gouveia@geradornv.com.br', '11 2854-3942');

-- =====================
-- TABELA EVENTOS
-- =====================
CREATE TABLE eventos(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    cliente VARCHAR(255) NOT NULL,
    data VARCHAR(255),
    local_evento VARCHAR(255),
    tipo VARCHAR(255),
    convidados INT,
    responsavel VARCHAR(255),
    UNIQUE (ID)
);

INSERT INTO eventos (
    cliente, data, local_evento, tipo, convidados, responsavel
)
VALUES 
('clienteA', '12/12/2026', 'Casa de Eventos', 'aniversario', 29, 'usuarioA'),
('clienteB x Esposa', '27/08/2026', 'Jardim Municipal', 'Festa pós-casamento', 107, 'usuarioB');