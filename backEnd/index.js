const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path'); // Adicionado para lidar com caminhos de arquivos
const app = express();
const port = 8081;

// Importar a configuração do passport
require('./config/passport')(passport);

// Importações dos controladores
const alarmeController = require('./controllers/AlarmeController');
const loginController = require('./controllers/LoginController');
const usuarioController = require('./controllers/UsuarioController');
const uploadController = require('./controllers/UploadController'); // Importar o novo controlador

app.use(bodyParser.json());
app.use(cors());

// Inicializar o passport
app.use(passport.initialize());

// Configurar o caminho público para uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));

// Proteger rotas com JWT
app.use('/alarme', passport.authenticate('jwt', { session: false }), alarmeController);
app.use('/login', loginController);
app.use('/cadastro', usuarioController);
app.use('/upload', uploadController); // Adicionar a rota de upload

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
