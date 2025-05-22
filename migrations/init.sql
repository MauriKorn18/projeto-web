-- Criação da tabela de user
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR (70),
  data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS tarefa (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao VARCHAR(500) NOT NULL,
  data_criacao DATE,
  data_entrega DATE,
  concluido BOOLEAN NOT NULL,
  usuarios_id INTEGER,
  FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS categoria (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  data_criacao DATE,
  tarefa_id INTEGER,
  FOREIGN KEY (tarefa_id) REFERENCES tarefa(id)
);