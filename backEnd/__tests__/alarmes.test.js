const request = require('supertest');
const express = require('express');
const { SequelizeMock } = require('sequelize-mock');
const ItemMock = require('../models/Alarme');
const jestConfig = require('../jest.config');
const router = require('../controllers/AlarmeController');
const { DESCRIBE } = require('sequelize/lib/query-types');
const app = express();


app.use(express.json());
app.use('/alarme', router);

// const DBConnectionMock = new SequelizeMock();
// const ItemMockModel = DBConnectionMock.define('Alarme',{
//     id_alarme:1,
//     fk_usuario:1,
//     nome_medicamento:'Doril',
//     posologia:1,
//     intervalo_doses:6
// });
// jest.mock('../models/Alarme',() => ItemMockModel);






// Teste para a rota GET '/'
// describe('GET /alarme', () => {
//   it('should get all alarmes', async () => {
//     const response = await request(app).get('/alarme');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([{
//         "id_alarme": 2,
//         "fk_usuario": 1,
//         "nome_medicamento": "Cardilol",
//         "posologia": 1,
//         "intervalo_doses": 24,
//         "createdAt": "2024-06-20T02:13:10.000Z",
//         "updatedAt": "2024-06-20T02:13:10.000Z"
//       },
//       {
//         "id_alarme": 3,
//         "fk_usuario": 1,
//         "nome_medicamento": "Dipirona",
//         "posologia": 2,
//         "intervalo_doses": 12,
//         "createdAt": "2024-06-20T05:03:14.000Z",
//         "updatedAt": "2024-06-20T05:03:14.000Z"
//       }]);
//   });
// });

// Create
describe('Post /alarm', () => {
    it('should create an item', async () => {
        const res = await request(app)
            .post('/alarme')
            .send({ fk_usuario: 1, nome_medicamento: "Doril", posologia: 2, intervalo_doses: 3 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id_alarme');
        expect(res.body.name).toBe('Doril');
        itemId = res.body.id;
    });
});


// Read One
//   it('should get an item by id', async () => {
//     const res = await request(app).get(`/items/${itemId}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('id');
//     expect(res.body.id).toBe(itemId);
//   });

module.exports = router;