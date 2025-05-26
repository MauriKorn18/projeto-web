const db = require('../config/db');

const Usuario = {
  async criar({ nome, email, data_nascimento }) {
    const query = `
      INSERT INTO usuarios (nome, email, data_nascimento)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [nome, email, data_nascimento];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM usuarios ORDER BY id ASC');
    return result.rows;
  },

  async atualizar(id, { nome, email, data_nascimento }) {
    const query = `
      UPDATE usuarios
      SET nome = $1, email = $2, data_nascimento = $3
      WHERE id = $4
      RETURNING *`;
    const values = [nome, email, data_nascimento, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Usuario;
