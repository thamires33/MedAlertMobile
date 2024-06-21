const express = require('express');
const router = express.Router();
const Usuario = require('../models/Login');

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
    }

    try {
        console.log(`Tentando login para email: ${email}`);

        const usuario = await Usuario.findOne({ where: { email, senha } });

        if (usuario) {
            console.log('Usuário encontrado:', usuario);
            return res.status(200).json({ success: true, message: 'Login bem-sucedido' });
        } else {
            console.log('Credenciais inválidas para email:', email);
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;