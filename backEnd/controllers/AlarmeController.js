const express = require('express');
const router = express.Router();
const Alarme = require('../models/Alarme');

router.get('/', async (req, res) => {
    try {
        const alarmes = await Alarme.findAll();
        res.status(200).json(alarmes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alarmes', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { medicamento, dosagem, frequencia, unidade, imageUri } = req.body;
        console.log("Received data:", req.body); // Log para verificar os dados recebidos (tirar depois)

        const newAlarme = await Alarme.create({ medicamento, dosagem, frequencia, unidade, imageUri });
        console.log("Created new alarm:", newAlarme); // Log para verificar se o alarme foi criado (tirar depois)

        res.status(201).json({ message: 'Alarme cadastrado com sucesso', newAlarme });
    } catch (error) {
        console.error("Error creating alarm:", error);
        res.status(500).json({ message: 'Erro ao cadastrar alarme', error });
    }
});

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