const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/Login');
const saltRounds = 10;
const secretOrKey = 'abc'; // Use um segredo forte e seguro

exports.registerAndLogin = async (req, res) => {
    const { email, password, action } = req.body;

    if (!email || !password || !action) {
        return res.status(400).json({ error: 'Por favor, forneça email, senha e ação' });
    }

    try {
        if (action === 'register') {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newLogin = await Login.create({ email, password: hashedPassword });
            return res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } else if (action === 'login') {
            const Login = await Login.findOne({ where: { email } });
            if (!Login) {
                return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
            }

            const isMatch = await bcrypt.compare(password, Login.password);
            if (isMatch) {
                const payload = { id: Login.id, email: Login.email };
                const token = jwt.sign(payload, secretOrKey, { expiresIn: '1h' });
                return res.json({ success: true, token: `Bearer ${token}` });
            } else {
                return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
            }
        } else {
            return res.status(400).json({ error: 'Ação inválida' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro no servidor', message: error.message });
    }
};
