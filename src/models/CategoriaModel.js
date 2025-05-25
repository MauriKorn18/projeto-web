const db = require('../config/db');

const Categoria = {
  async criar({ nome, descricao, ordem, concluido = false, tarefa_is }) {
    const query = `
      INSERT INTO categoria (nome, descricao, ordem, concluido, tarefa_is)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [nome, descricao, ordem, concluido, tarefa_is];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM categoria ORDER BY ordem ASC');
    return result.rows;
  },

  async atualizar(id, { nome, descricao, ordem, concluido }) {
    const query = `
      UPDATE categoria
      SET nome = $1, descricao = $2, ordem = $3, concluido = $4
      WHERE id = $5
      RETURNING *`;
    const values = [nome, descricao, ordem, concluido, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Categoria;