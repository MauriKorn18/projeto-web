// src/routes/views.js
const express = require('express');
const router = express.Router();

// Importa seu TarefaService ou repositório (ajuste o caminho conforme seu projeto)
const TarefaService = require('../services/TarefaService'); // <- Ajuste se necessário

// Página inicial: lista de tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await TarefaService.listarTarefasService();
        res.render('index', { tasks });
    } catch (err) {
        console.error('[GET /] Erro ao carregar tarefas:', err);
        res.status(500).send('Erro ao carregar tarefas.');
    }
});

// Página de criação de tarefa
router.get('/tarefas/nova', (req, res) => {
    res.render('form', { task: null });
});

// Página de edição de tarefa
router.get('/tarefas/editar/:id', async (req, res) => {
    try {
        const task = await TarefaService.buscarPorId(req.params.id); // ou getById
        if (!task) return res.status(404).send('Tarefa não encontrada');
        res.render('form', { task });
    } catch (err) {
        console.error('[GET /tarefas/editar/:id] Erro:', err);
        res.status(500).send('Erro ao carregar tarefa.');
    }
});

module.exports = router;
