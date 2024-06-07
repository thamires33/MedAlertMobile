const express = require('express'); 
const router = express.Router(); 
//Importando o módulo do Paciente 
const Paciente = require('../models/Paciente'); 
//Busca Paciente (GET) 
router.get('/', async (req, res) => { 
    const Pacientes = await Paciente.findAll(); 
    res.status(200).json(Pacientes); 
}); 
//Cadastra Paciente (POST) 
router.post('/', async (req, res) => { 
    const { nome } = req.body; 
    const { sobrenome } = req.body; 
    const { dtNasc } = req.body; 
    const { endereco } = req.body; 
    const { contato } = req.body; 
    const newEdit = await Paciente.create({ nome, sobrenome, dtNasc, 
endereco, contato}) 
    res.status(200).json({ message: 'Cadastrado com sucesso' }); 
}); 
//Busca Por id a Paciente (GET) 
router.get('/:id', async (req, res) => { 
    //const id = req.params; 
    const Paciente = await Paciente.findByPk(req.params.id); 
    res.status(200).json(Paciente); 
}); 
//Deleta Paciente por id (DELETE) 
router.delete('/:id', async (req, res) => { 
    await Paciente.destroy({ 
        where: { id_Paciente: req.params.id }, 
    }); 
    res.status(200).json({ message: 'Excluído com sucesso' }) 
}); 
//Altera Paciente por ID (PUT) 
router.put('/:id', async (req, res) => { 
    const { nome } = req.body; 
    const { sobrenome } = req.body; 
    const { dtNasc } = req.body; 
    const { endereco } = req.body; 
    const { contato } = req.body; 
    await Paciente.update( 
        { nome, sobrenome, dtNasc, endereco, contato}, 
        { 
            where: { id_Paciente: req.params.id }, 
        } 
    ); 
    res.status(200).json({ message: 'Atualizado com sucesso' }); 
}); 
module.exports = router;