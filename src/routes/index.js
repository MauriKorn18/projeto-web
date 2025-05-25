const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const TarefaController = require('../controllers/TarefaController');
const CategoriaController = require('../controllers/CategoriaController');


router.post('/app_usuarios', UsuarioController.criarUsuario);
router.get('/app_usuarios', UsuarioController.listarUsuario);
router.put('/app_usuarios/:id', UsuarioController.editarUsuario);
router.delete('/app_usuarios/:id', UsuarioController.excluirUsuario);

router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

router.post('/categorias', CategoriaController.criarCategoria);
router.get('/categorias', CategoriaController.listarCategorias);
router.put('/categorias/:id', CategoriaController.editarCategoria);
router.delete('/categorias/:id', CategoriaController.excluirCategoria);

module.exports = router; 