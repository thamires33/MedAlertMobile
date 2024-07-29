const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const usuario = require('../models/Login');

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
    }

    try {
        const existingUser = await usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email já está em uso' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);
        console.log(await bcrypt.hash(senha, salt));

        const newUsuario = await usuario.create({ email, senha: hashedSenha });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso', newUsuario });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
});

module.exports = router;