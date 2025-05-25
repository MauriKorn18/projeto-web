const usuarioService = require('../services/UsuarioService');

exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.criarUsuarioService(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarUsuario = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuariosService();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.editarUsuarioService(req.params.id, req.body);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirusuario = async (req, res) => {
  try {
    const usuario = await usuarioService.excluirUsuarioService(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};