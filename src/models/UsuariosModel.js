const db = require('../config/db');

const Usuario = {
  async criar({ nome, email, senha_hash }) {
    const query = `
      INSERT INTO app_user (nome, email, senha_hash)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [nome, email, senha_hash];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listar() {
    const result = await db.query('SELECT * FROM app_user');
    return result.rows;
  },

  async atualizar(id, { nome, email, senha_hash }) {
    const query = `
      UPDATE app_user
      SET nome = $1, email = $2, senha_hash = $3
      WHERE id = $4
      RETURNING *`;
    const values = [nome, email, senha_hash, id];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async excluir(id) {
    const result = await db.query('DELETE FROM app_user WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = User;