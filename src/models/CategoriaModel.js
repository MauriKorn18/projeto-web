const db = require('../config/db');

const Categoria = {
  async criar({ title, descricao, ordem, concluido = false, id_tarefa }) {
    const query = `
      INSERT INTO categoria (title, descricao, ordem, concluido, id_tarefa)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [title, descricao, ordem, concluido, id_tarefa];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM categoria ORDER BY ordem ASC');
    return result.rows;
  },

  async atualizar(id, { title, descricao, ordem, concluido }) {
    const query = `
      UPDATE categoria
      SET title = $1, descricao = $2, ordem = $3, concluido = $4
      WHERE id = $5
      RETURNING *`;
    const values = [title, descricao, ordem, concluido, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Categoria;