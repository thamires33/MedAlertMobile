const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8081;



const alarmeController = require('./controllers/AlarmeController.js');
const loginController = require('./controllers/LoginController.js');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('API MedAlert está funcionando!'));


app.use('/alarme', alarmeController);
app.use('/login', loginController);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));