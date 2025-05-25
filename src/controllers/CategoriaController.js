const categoriaService = require('../services/CategoriaService');

exports.criarCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.criarCategoriaService(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.listarCategoriasService();
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.editarCategoriaService(req.params.id, req.body);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.excluirCategoriaService(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};