const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Login'); 

router.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
    }

    try {
        // Verifica se o usuário já existe
        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Usuário já cadastrado' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria o novo usuário
        const newUser = await Usuario.create({ email, senha: hashedPassword });

        res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso', user: newUser });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
    }
});

module.exports = router;
