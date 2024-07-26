const express = require('express');
const router = express.Router();
const Login = require('../models/Login'); // Modelo de usuário

router.post('/updateProfile', async (req, res) => {
  try {
    const { nome, endereco, idade, telefone, toqueAlarme, email, senha } = req.body;
    const profileImage = req.file ? req.file.path : null; // Caminho da imagem se fornecida

    // Atualizar o usuário no banco de dados
    const updatedUser = await Login.update(
      {
        nome,
        endereco,
        idade,
        telefone,
        toqueAlarme,
        email,
        senha,
        profileImage
      },
      { where: { id_usuario: req.user.id }, returning: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).send('Erro ao atualizar perfil');
  }
});

module.exports = router;
