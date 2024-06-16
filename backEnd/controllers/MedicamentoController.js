const express = require('express');
const router = express.Router();
//Importando o módulo do Medicamento 
const Medicamento = require('../models/Medicamento');
//Busca Medicamento (GET) 
router.get('/', async (req, res) => {
    const Medicamentos = await Medicamento.findAll();
    res.status(200).json(Medicamentos);
});
//Cadastra Medicamento (POST) 
router.post('/', async (req, res) => {
    const { nome } = req.body;
    const { dosagem } = req.body;
    const { fabricante } = req.body;
    const { tarja } = req.body;
    const newEdit = await Medicamento.create({ nome, dosagem, fabricante, tarja });

    res.status(200).json({ message: 'Cadastrado com sucesso' });
});
//Busca Por id a Medicamento (GET) 
router.get('/:id', async (req, res) => {
    //const id = req.params; 
    const Medicamento = await Medicamento.findByPk(req.params.id);
    res.status(200).json(Medicamento);
});
//Deleta Medicamento por id (DELETE) 
router.delete('/:id', async (req, res) => {
    await Medicamento.destroy({
        where: { id_Medicamento: req.params.id },
    });
    res.status(200).json({ message: 'Excluído com sucesso' })
});
//Altera Medicamento por ID (PUT) 
router.put('/:id', async (req, res) => {
    const { nome } = req.body;
    const { dosagem } = req.body;
    const { fabricante } = req.body;
    const { tarja } = req.body;
    await Medicamento.update(
        { nome, dosagem, fabricante, tarja },
        {
            where: { id_Medicamento: req.params.id },
        }
    );
    res.status(200).json({ message: 'Atualizado com sucesso' });
});
module.exports = router;