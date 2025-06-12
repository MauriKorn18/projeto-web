require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db.js');
const path = require('path');
const tarefaService = require('./src/services/TarefaService'); // Importado para usar na rota "/"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Servir arquivos estáticos
app.use("/public", express.static(path.join(__dirname, "src/public")));

// Carregar as rotas da API
const routes = require('./src/routes');
app.use('/api', routes);

// Rota para exibir index.ejs com lista de tarefas
app.get("/", async (req, res) => {
  try {
    const tasks = await tarefaService.listarTarefasService();
    res.render("index", { tasks });
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
    res.status(500).send("Erro interno ao carregar tarefas");
  }
});

// Testa a conexão com o banco de dados ao iniciar
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
    process.exit(1); // Encerra o app se não conectar
  });

app.get('/usuarios', (req, res) => {
  res.render('usuarios');
});

app.get('/categorias', (req, res) => {
  res.render('categorias');
});
