const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const https = require('https');
const app = express();
const port = 8081;

// Importações dos controladores
const medicoController = require('./controllers/MedicoController.js');
const pacienteController = require('./controllers/PacienteController.js');
const receitaController = require('./controllers/ReceitaController.js');
const medicamentoController = require('./controllers/MedicamentoController.js');
const farmaciaController = require('./controllers/FarmaciaController.js');
const alarmeController=require('./controllers/AlarmeController.js');
const loginController=require('./controllers/LoginController.js');


// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));

app.use('/medico', medicoController);
app.use('/paciente', pacienteController);
app.use('/receita', receitaController);
app.use('/medicamento', medicamentoController);
app.use('/farmacia', farmaciaController);
app.use('/login', loginController);

app.use('/alarme', alarmeController);

//// Middleware de tratamento de erros
//app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Algo deu errado!');
//});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));