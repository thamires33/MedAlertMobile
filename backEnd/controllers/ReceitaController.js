const express = require('express');
const router = express.Router();
//Importando o módulo do Receita 
const Receita = require('../models/Receita');
//Busca Receita (GET) 
router.get('/', async (req, res) => {
    const Receitas = await Receita.findAll();
    res.status(200).json(Receitas);
});
//Cadastra Receita (POST) 
router.post('/', async (req, res) => {
    const { fk_medico } = req.body;
    const { fk_paciente } = req.body;
    const { datePrescricao } = req.body;
    const { diagnostico } = req.body;
    const { observacoes } = req.body;
    const newEdit = await Receita.create({
        fk_medico, fk_paciente, datePrescricao,
        diagnostico, observacoes
    })
    res.status(200).json({ message: 'Cadastrado com sucesso' });
});
//Busca Por id a Receita (GET) 
router.get('/:id', async (req, res) => {
    //const id = req.params; 
    const Receita = await Receita.findByPk(req.params.id);
    res.status(200).json(Receita);
});
//Deleta Receita por id (DELETE) 
router.delete('/:id', async (req, res) => {
    await Receita.destroy({
        where: { id_Receita: req.params.id },
    });
    res.status(200).json({ message: 'Excluído com sucesso' })
});
//Altera Receita por ID (PUT) 
router.put('/:id', async (req, res) => {
    const { fk_medico } = req.body;
    const { fk_paciente } = req.body;
    const { datePrescricao } = req.body;
    const { diagnostico } = req.body;
    const { observacoes } = req.body;
    await Receita.update(
        { fk_medico, fk_paciente, datePrescricao, diagnostico, observacoes },
        {
            where: { id_Receita: req.params.id },
        }
    );
    res.status(200).json({ message: 'Atualizado com sucesso' });
});
module.exports = router;