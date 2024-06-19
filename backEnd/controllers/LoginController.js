const express = require('express');
const router = express.Router();
const Usuario = require('../models/Login');

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