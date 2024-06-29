const express = require('express');
const router = express.Router();
const Alarme = require('../models/Alarme');

// Busca todos os Alarmes (GET)
router.get('/', async (req, res) => {
    try {
        const alarmes = await Alarme.findAll();
        res.status(200).json(alarmes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alarmes', error });
    }
});

// Cadastra Alarme (POST)
router.post('/', async (req, res) => {
    try {
        const { medicamento, dosagem, frequencia, unidade } = req.body;
        const newAlarme = await Alarme.create({ medicamento, dosagem, frequencia, unidade });
        res.status(201).json({ message: 'Alarme cadastrado com sucesso', newAlarme });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar alarme', error });
    }
});

// Busca Alarme por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const alarme = await Alarme.findByPk(req.params.id);
        if (alarme) {
            res.status(200).json(alarme);
        } else {
            res.status(404).json({ message: 'Alarme não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alarme', error });
    }
});

module.exports = router;
