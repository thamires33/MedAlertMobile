const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
  }

  const imageUrl = `http://localhost:8081/uploads/${req.file.filename}`;

  try {
    const newImage = await Image.create({
      filename: req.file.filename,
      url: imageUrl
    });
    res.json({ imageUrl: newImage.url });
  } catch (error) {
    console.error('Erro ao salvar imagem no banco de dados:', error);
    res.status(500).json({ error: 'Erro ao salvar imagem no banco de dados.' });
  }
});

module.exports = router;
