// controllers/UploadController.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  const imageUrl = `http://localhost:8081/uploads/${req.file.filename}`;
  

  try {
    await Image.create({
      filename: req.file.filename,
      url: imageUrl,
    });
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar imagem no banco de dados.' });
  }
});

module.exports = router;
