const express = require('express'); 
const router = express.Router(); 
//Importando o módulo do Farmacia 
const Farmacia = require('../models/Farmacia'); 
//Busca Farmacia (GET) 
router.get('/', async (req, res) => { 
    const Farmacias = await Farmacia.findAll(); 
    res.status(200).json(Farmacias); 
}); 
//Cadastra Farmacia (POST) 
router.post('/', async (req, res) => { 
    const { nome } = req.body; 
    const { endereco } = req.body; 
    const { contato } = req.body; 
    const newEdit = await Farmacia.create({ nome, endereco, contato}) 
    res.status(200).json({ message: 'Cadastrado com sucesso' }); 
}); 
//Busca Por id a Farmacia (GET) 
router.get('/:id', async (req, res) => { 
    //const id = req.params; 
    const Farmacia = await Farmacia.findByPk(req.params.id); 
    res.status(200).json(Farmacia); 
}); 
//Deleta Farmacia por id (DELETE) 
router.delete('/:id', async (req, res) => { 
    await Farmacia.destroy({ 
        where: { id_Farmacia: req.params.id }, 
    }); 
    res.status(200).json({ message: 'Excluído com sucesso' }) 
}); 
//Altera Farmacia por ID (PUT) 
router.put('/:id', async (req, res) => { 
    const { nome } = req.body; 
    const { endereco } = req.body; 
    const { contato } = req.body; 
    await Farmacia.update( 
        { nome, endereco, contato}, 
        { 
            where: { id_Farmacia: req.params.id }, 
        } 
    ); 
    res.status(200).json({ message: 'Atualizado com sucesso' }); 
}); 
module.exports = router;