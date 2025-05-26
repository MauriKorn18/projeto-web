const db = require('../config/db');

async function criarCategoriaService({ nome, descricao, ordem, concluido = false, tarefa_id }) {
  const query = `
    INSERT INTO categoria (nome, descricao, ordem, concluido, tarefa_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [nome, descricao, ordem, concluido, tarefa_id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarCategoriasService() {
  const result = await db.query('SELECT * FROM categoria ORDER BY ordem ASC');
  return result.rows;
}

async function editarCategoriaService(id, { nome, descricao, ordem, concluido }) {
  const query = `
    UPDATE categoria
    SET nome = $1, descricao = $2, ordem = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [nome, descricao, ordem, concluido, id];

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