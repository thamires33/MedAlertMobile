const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();
const port = 8081;

// Importações do dotenv e configuração do passport
require('dotenv').config();
require('./config/passport')(passport);

// Argumentos da linha de comando
const args = process.argv.slice(2);

// Importações dos modelos
const Alarme = require('./models/Alarme');
const Login = require('./models/Login');

// Função para rodar migrações
const runMigrations = async () => {
  try {
    console.log('\nRodando migrações...\n');
    
    // Executa as migrações para Alarme e Login
    await Promise.all([Alarme.sync({ force: true }), Login.sync({ force: true })]);
    
    console.log('Tabelas criadas com sucesso!\n');
  } catch (err) {
    console.error('Erro ao criar as tabelas:', err);
  }
};

// Função para iniciar o servidor
const startServer = () => {
  // Configurações do Express
  app.use(bodyParser.json());
  app.use(cors());
  app.use(passport.initialize());

  // Importação dos controladores
  const alarmeController = require('./controllers/AlarmeController.js');
  const loginController = require('./controllers/LoginController.js');
  const usuarioController = require('./controllers/UsuarioController.js');

  // Rotas
  app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));
  app.use('/alarme', passport.authenticate('jwt', { session: false }), alarmeController);
  app.use('/login', loginController);
  app.use('/cadastro', usuarioController);

  // Middleware de tratamento de erros
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

  // Inicializa o servidor
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
};

// Executa as migrações se o argumento "migrate" for passado
const initializeApp = async () => {
  if (args.includes('migrate')) {
    await runMigrations();
  }
  
  // Após as migrações (ou caso não haja migrações), inicia o servidor
  startServer();
};

// Inicializa a aplicação
initializeApp();