# Projeto Individual Módulo 02 - 2025

### Descrição do Sistema:
O sistema desenvolvido tem como objetivo auxiliar na organização pessoal por meio da criação e gerenciamento de tarefas. Usuários podem cadastrar atividades, definir prazos, marcar como concluídas ou não, e relacionar cada tarefa a uma categoria específica. As tabelas do banco refletem essa estrutura: usuarios, tarefa (vinculada ao usuário via UUID) e categoria (vinculada à tarefa). Tudo é controlado por meio de um processo digital simples, eficiente e voltado para o uso pessoal.

### Estrutura de Pastas:
 ```
 PROJETO_INDIVIDUALMOD2
├── 📁 assets
|   ├── diagrama_mvc.png
│   └── modelo-branco.png
├── 📁 documentos
|   ├── README.md
|   └── wad.md
├── 📁 node_modules
├── 📁 src
│   └── 📁 config
|   |   └── db.js
│   └── 📁 controllers
|   |   ├── CategoriaController.js
|   |   ├── TarefaController.js
|   |   └── UsuariosController.js
│   └── 📁 migrations
|   |   └── 📁 scripts
|   |   |   └── 202505091130_usuarios.sql
|   |   ├── init.sql
|   |   ├── runMigration.js
|   |   └── runSQLScript.js
│   └── 📁 models
|   |   ├── CategoriaModel.js
|   |   ├── TarefaModel.js
|   |   └── UsuariosModel.js
│   └── 📁 public
|   |   ├── categorias.js
|   |   ├── styles.css
|   |   ├── tarefas.js
|   |   └── usuarios.js
│   └── 📁 routes
|   |   └── index.js
│   └── 📁 services
|   |   ├── CategoriaService.js
|   |   ├── TarefaService.js
|   |   └── UsuariosService.js
│   └── 📁 views
|   |   ├── categorias.ejs
|   |   ├── form.ejs
|   |   ├── index.ejs
|   |   └── usuarios.ejs
│   └── 📁 tests
|   |   ├── tarefa.test.js
|   |   └── usuarios.test.js
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── rest.http
├── server.js
├── test.http
``` 

### Como executar o projeto localmente:

- Pré-requisitos

    - [Node.js](https://nodejs.org/) instalado (versão recomendada: 18.x ou superior).
    - [PostgreSQL](https://www.postgresql.org/) instalado e em execução.
    - Git instalado.

1. Clone o repositório:
    - Abra o terminal e execute:
    ```bash
     git clone https://github.com/MauriKorn18/projeto-web.git
     cd projeto-web
     ```

2. Instale as dependências do projeto:
     - Certifique-se de que o Node.js está instalado.
     - Execute o comando:
     ```bash
     npm install
     ```

3. Configure o ambiente:
     - Copie o arquivo de exemplo de variáveis de ambiente:
     ```bash
     cp .env.example .env
     ```
     - Edite o `.env` com as informações corretas do Supabase (banco de dados, porta, etc.).

4. Configure o banco de dados:
    - Certifique-se que o PostgreSQL está configurado e rodando e depois execute esse comando:
     ```bash
     node migrations/runSQLScript.js
     ```
   - Isso criará as tabelas `usuarios`, `salas` e `reservas`.

5. Inicie o servidor:
    - Com o banco configurado e o `.env` preenchido:
     ```bash
     npm start
     ```
   - O sistema será iniciado em `http://localhost:3000` (ou na porta especificada).

