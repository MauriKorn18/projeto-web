require('dotenv').config();
const express = require('express');
const app = express();
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use(express.json());
app.use('/categorias', categoriaRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));