# Web Application Document (WAD)

## Introdução

Este projeto é uma aplicação web que utiliza Node.js e PostgreSQL como tecnologias principais. A estrutura do sistema foi organizada com a separação clara de responsabilidades entre controladores, modelos, serviços e migrações. Trata de um sistema voltado especialmente para iniciantes e atividades acadêmicas, oferecendo uma base prática para o desenvolvimento backend com banco de dados relacional.

## Diagrama do Banco de Dados

O banco de dados foi estruturado a partir de um modelo simples, incluindo, por exemplo, uma tabela de usuários. As migrações responsáveis pela criação das tabelas encontram-se no diretório `/migrations/scripts` e são organizadas em ordem cronológica de execução, conforme o timestamp presente no nome de cada arquivo.

> O modelo físico do banco de dados está representado na imagem abaixo:

![Modelo Físico](../assets/modelo-banco.png)