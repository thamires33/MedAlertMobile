const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuração do multer para armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Rota para upload de arquivos
router.post('/upload', upload.single('photo'), (req, res) => {
  try {
    res.json({ message: 'Arquivo enviado com sucesso!', file: req.file });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar o arquivo' });
  }
});

module.exports = router;
