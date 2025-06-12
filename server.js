require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db.js');
const path = require('path');
const tarefaService = require('./src/services/TarefaService');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Servir arquivos estáticos
app.use("/public", express.static(path.join(__dirname, "src/public")));

// Rotas da API
const routes = require('./src/routes');
app.use('/api', routes);

// Página inicial com lista de tarefas
app.get("/", async (req, res) => {
  try {
    const tasks = await tarefaService.listarTarefasService();
    res.render("index", { tasks });
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
    res.status(500).send("Erro interno ao carregar tarefas");
  }
});

// Rota de edição visual de tarefa
app.get("/tarefas/editar/:id", async (req, res) => {
  try {
    const task = await tarefaService.buscarTarefaPorIdService(req.params.id);
    if (!task) return res.status(404).send("Tarefa não encontrada");
    res.render("form", { task });
  } catch (err) {
    console.error("Erro ao buscar tarefa:", err);
    res.status(500).send("Erro interno");
  }
});

// Rota visual de usuários
app.get('/usuarios', (req, res) => {
  res.render('usuarios');
});

// Rota visual de categorias
app.get('/categorias', (req, res) => {
  res.render('categorias');
});

// Inicia o servidor após testar o banco
db.query('SELECT NOW()')
  .then(result => {
    console.log('Conectado ao banco de dados PostgreSQL');
    console.log(`Hora atual no banco: ${result.rows[0].now}`);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });
