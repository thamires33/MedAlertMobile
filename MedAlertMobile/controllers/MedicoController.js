const express = require('express'); 
const router = express.Router(); 
//Importando o módulo do Medico 
const Medico = require('../models/Medico'); 
//Busca Medico (GET) 
router.get('/', async (req, res) => { 
    const Medicos = await Medico.findAll(); 
    res.status(200).json(Medicos); 
}); 
//Cadastra Medico (POST) 
router.post('/', async (req, res) => { 
    const { nome } = req.body; 
    const { sobrenome } = req.body; 
    const { especialidade } = req.body; 
    const { CRM } = req.body; 
    const { contato } = req.body; 
    const newEdit = await Medico.create({ nome, sobrenome, especialidade, CRM, contato });
    res.status(200).json({ message: 'Cadastrado com sucesso' }); 
}); 
//Busca Por id a Medico (GET) 
router.get('/:id', async (req, res) => { 
    //const id = req.params; 
    const Medico = await Medico.findByPk(req.params.id); 
    res.status(200).json(Medico); 
}); 
//Deleta Medico por id (DELETE) 
router.delete('/:id', async (req, res) => { 
    await Medico.destroy({ 
        where: { id_Medico: req.params.id }, 
    }); 
    res.status(200).json({ message: 'Excluído com sucesso' }) 
}); 
//Altera Medico por ID (PUT) 
router.put('/:id', async (req, res) => { 
    const { nome } = req.body; 
    const { sobrenome } = req.body; 
    const { especialidade } = req.body; 
    const { CRM } = req.body; 
    const { contato } = req.body; 
    await Medico.update( 
        { nome, sobrenome, especialidade, CRM, contato}, 
        { 
            where: { id_Medico: req.params.id }, 
        } 
    ); 
    res.status(200).json({ message: 'Atualizado com sucesso' }); 
}); 
module.exports = router;