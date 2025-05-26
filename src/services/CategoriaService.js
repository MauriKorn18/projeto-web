const db = require('../config/db');

async function criarCategoriaService({ nome, descricao, data_criacao, tarefa_id }) {
  const query = `
    INSERT INTO categoria (nome, descricao, data_criacao, tarefa_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [nome, descricao, data_criacao, tarefa_id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarCategoriasService() {
  const result = await db.query('SELECT * FROM categoria ORDER BY data_criacao DESC');
  return result.rows;
}

async function editarCategoriaService(id, { nome, descricao, tarefa_id }) {
  const query = `
    UPDATE categoria
    SET nome = $1, descricao = $2, tarefa_id = $3
    WHERE id = $4
    RETURNING *`;
  const values = [nome, descricao, tarefa_id, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function excluirCategoriaService(id) {
  const query = 'DELETE FROM categoria WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarCategoriaService,
  listarCategoriasService,
  editarCategoriaService,
  excluirCategoriaService,
};
