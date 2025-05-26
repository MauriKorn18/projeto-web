const db = require('../config/db');

async function criarUsuarioService({ nome, email, data_nascimento }) {
  const query = `
    INSERT INTO usuarios (nome, email, data_nascimento)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [nome, email, data_nascimento];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function listarUsuariosService() {
  const result = await db.query('SELECT * FROM usuarios');
  return result.rows;
}

async function editarUsuarioService(id, { nome, email, data_nascimento }) {
  const query = `
    UPDATE usuarios
    SET nome = $1, email = $2, data_nascimento = $3
    WHERE id = $4
    RETURNING *`;
  const values = [nome, email, data_nascimento, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function excluirUsuarioService(id) {
  const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarUsuarioService,
  listarUsuariosService,
  editarUsuarioService,
  excluirUsuarioService,
};
