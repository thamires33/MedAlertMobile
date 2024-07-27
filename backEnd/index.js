const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8081;

// Importar a configuração do passport
require('./config/passport')(passport);

// Importações dos controladores
const alarmeController = require('./controllers/AlarmeController');
const loginController = require('./controllers/LoginController');
const usuarioController = require('./controllers/UsuarioController');
const { updateProfile } = require('./controllers/ProfileController'); // Certifique-se de que o caminho está correto

// Configuração de armazenamento com Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());

// Inicializar o passport
app.use(passport.initialize());

app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));

// Proteger rotas com JWT
app.use('/alarme', passport.authenticate('jwt', { session: false }), alarmeController);
app.use('/login', loginController);
app.use('/cadastro', usuarioController);

// Rota para atualizar perfil
app.post('/updateProfile', passport.authenticate('jwt', { session: false }), upload.single('profileImage'), updateProfile);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
