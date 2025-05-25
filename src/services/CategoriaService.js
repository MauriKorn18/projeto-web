const db = require('../config/db');

async function criarCategoriaService({ title, descricao, ordem, concluido = false, id_tarefa }) {
  const query = `
    INSERT INTO categoria (title, descricao, ordem, concluido, id_tarefa)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [title, descricao, ordem, concluido, id_tarefa];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarCategoriasService() {
  const result = await db.query('SELECT * FROM categoria ORDER BY ordem ASC');
  return result.rows;
}

async function editarCategoriaService(id, { title, descricao, ordem, concluido }) {
  const query = `
    UPDATE categoria
    SET title = $1, descricao = $2, ordem = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [title, descricao, ordem, concluido, id];

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