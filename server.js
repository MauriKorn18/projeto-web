require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db.js');
const path = require('path');

app.use(express.json());

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use("/public", express.static(path.join(__dirname, "public")));

// Carregar as rotas da API
const routes = require('./src/routes');
app.use('/api', routes);

// Carregar as rotas das views
const viewsRoutes = require("./src/routes/views");
app.use("/", viewsRoutes);

// Testa a conexão quando inicia
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
    process.exit(1); // Encerra o app se não conecta
  });
