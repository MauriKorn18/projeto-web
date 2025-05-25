const db = require('../config/db');

const Tarefa = {
  async criar({ titulo, descricao, data_criada, data_de_entrega, concluido = false, id_usuario }) {
    const query = `
      INSERT INTO tarefa (titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [titulo, descricao, data_criada, data_de_entrega, concluido, id_usuario];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM tarefa ORDER BY data_criada DESC');
    return result.rows;
  },

  async atualizar(id, { titulo, descricao, data_de_entrega, concluido }) {
    const query = `
      UPDATE tarefa
      SET titulo = $1, descricao = $2, data_de_entrega = $3, concluido = $4
      WHERE id = $5
      RETURNING *`;
    const values = [titulo, descricao, data_de_entrega, concluido, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM tarefa WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Tarefa;