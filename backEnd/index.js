const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport'); // Importar o passport
const app = express();
const port = 8081;

// Importar a configuração do passport
require('./config/passport')(passport);

// Importações dos controladores
const alarmeController = require('./controllers/AlarmeController.js');
const loginController = require('./controllers/LoginController.js');
const usuarioController = require('./controllers/UsuarioController.js');

app.use(bodyParser.json());
app.use(cors());

// Inicializar o passport
app.use(passport.initialize());

app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));

// Proteger rotas com JWT
app.use('/alarme', passport.authenticate('jwt', { session: false }), alarmeController);
app.use('/login', loginController);
app.use('/cadastro', usuarioController);
// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));