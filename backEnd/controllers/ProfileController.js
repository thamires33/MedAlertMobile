// controllers/ProfileController.js
const Login = require('../models/Login'); // Certifique-se de que o caminho está correto

const updateProfile = async (req, res) => {
  try {
    // Verifique se o usuário está autenticado e se o ID do usuário está presente
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Obtenha os dados do formulário e o caminho da imagem se fornecido
    const { email, senha } = req.body;
    const profileImage = req.file ? req.file.path : null;

    // Atualizar o usuário no banco de dados
    const [updatedCount, updatedUsers] = await Login.update(
      {
        email,
        senha,
        profileImage,
      },
      { 
        where: { id_usuario: req.user.id }, // Certifique-se de que o campo `id_usuario` corresponde ao seu modelo de banco de dados
        returning: true 
      }
    );

    // Verifique se algum usuário foi atualizado
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Responda com os dados atualizados do usuário
    res.json(updatedUsers[0]);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    res.status(500).send('Erro ao atualizar perfil');
  }
};

module.exports = { updateProfile };
