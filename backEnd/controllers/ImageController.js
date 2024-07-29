const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Image = require('../models/Image');

// Configuração do multer para armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload')); // Certifique-se de que a pasta 'upload' existe
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Rota para upload de arquivos
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    const newImage = await Image.create({
      path: req.file.path,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      usuario_id: req.body.usuario_id // Supondo que o ID do usuário está sendo enviado no corpo da requisição
    });

    res.status(201).json({ message: 'Imagem enviada e registrada com sucesso!', newImage });
  } catch (error) {
    console.error(error); // Log do erro para diagnóstico
    res.status(500).json({ message: 'Erro ao enviar a imagem', error });
  }
});

module.exports = router;
