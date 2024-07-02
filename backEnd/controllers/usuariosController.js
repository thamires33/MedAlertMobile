const express = require('express');
const router = express.Router();
const {Usuario} = require('../models');
// const usuario = require('../models/usuario');

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
        res.status(500).json({ message: 'Erro ao buscar usuarios', error });
    }
});






router.post('/', async (req, res) => {
    const { email } = req.body;
    const { senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });

        if (usuario) {
            return res.status(200).json({ success: true, message: 'Login bem-sucedido' });
        } else {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;