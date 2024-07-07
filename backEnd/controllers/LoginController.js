const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys'); 
const Usuario = require('../models/Login'); 

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
    }

    try {
        console.log(`Tentando login para email: ${email}`);

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        //const salt=await bcrypt.genSalt(10);
        //console.log(await bcrypt.hash(senha, salt));

        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (isMatch) {
            const payload = {
                id: usuario.id_usuario,
                email: usuario.email
            };
            console.log(payload);
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token
                    });
                }
            );
        } else {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;