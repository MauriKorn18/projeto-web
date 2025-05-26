const db = require('../config/db');

async function criarTarefaService({ titulo, descricao, data_criacao, data_entrega, concluido = false, usuarios_id }) {
  const query = `
    INSERT INTO tarefa (titulo, descricao, data_criacao, data_entrega, concluido, usuarios_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  const values = [titulo, descricao, data_criacao, data_entrega, concluido, usuarios_id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarTarefasService() {
  const result = await db.query('SELECT * FROM tarefa ORDER BY data_criacao DESC');
  return result.rows;
}

async function editarTarefaService(id, { titulo, descricao, data_entrega, concluido }) {
  const query = `
    UPDATE tarefa
    SET titulo = $1, descricao = $2, data_entrega = $3, concluido = $4
    WHERE id = $5
    RETURNING *`;
  const values = [titulo, descricao, data_entrega, concluido, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function excluirTarefaService(id) {
  const query = 'DELETE FROM tarefa WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarTarefaService,
  listarTarefasService,
  editarTarefaService,
  excluirTarefaService,
};
