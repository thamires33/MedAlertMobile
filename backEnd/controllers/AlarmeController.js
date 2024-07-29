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
        const { medicamento, dosagem, frequencia, unidade, imageUri } = req.body;
        console.log("Received data:", req.body); // Log para verificar os dados recebidos

        const newAlarme = await Alarme.create({ medicamento, dosagem, frequencia, unidade, imageUri });
        console.log("Created new alarm:", newAlarme); // Log para verificar o alarme criado

        res.status(201).json({ message: 'Alarme cadastrado com sucesso', newAlarme });
    } catch (error) {
        console.error("Error creating alarm:", error);
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

// Deleta Alarme por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Alarme.destroy({ where: { id_alarme: req.params.id } });
        if (rowsDeleted) {
            res.status(200).json({ message: 'Alarme excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Alarme não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir alarme', error });
    }
});

// Altera Alarme por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { medicamento, dosagem, frequencia, unidade, imageUri } = req.body;
        const [rowsUpdated] = await Alarme.update(
            { medicamento, dosagem, frequencia, unidade, imageUri },
            { where: { id_alarme: req.params.id } }
        );
        if (rowsUpdated) {
            res.status(200).json({ message: 'Alarme atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Alarme não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar alarme', error });
    }
});

module.exports = router;