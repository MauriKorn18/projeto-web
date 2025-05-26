const db = require('../config/db');

const Categoria = {
  async criar({ nome, descricao, data_criacao, tarefa_id }) {
    const query = `
      INSERT INTO categoria (nome, descricao, data_criacao, tarefa_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [nome, descricao, data_criacao, tarefa_id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM categoria ORDER BY data_criacao DESC');
    return result.rows;
  },

  async atualizar(id, { nome, descricao, data_criacao, tarefa_id }) {
    const query = `
      UPDATE categoria
      SET nome = $1, descricao = $2, data_criacao = $3, tarefa_id = $4
      WHERE id = $5
      RETURNING *`;
    const values = [nome, descricao, data_criacao, tarefa_id, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Categoria;
