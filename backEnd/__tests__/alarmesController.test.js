const request = require('supertest');
const app = require("../app");

const { Alarme } = require("../models");

jest.mock("../models");

describe('Alerme Controller Tests', () => {
    //Teste para a rota GET '/'
    it('should get all alarmes', async () => {
        const expectedResult = ["test alarme 1", "test alarme 2"];
        Alarme.findAll = jest.fn(() => { return expectedResult; });

        const response = await request(app).get('/alarme');
        expect(response.status).toBe(200);
        expect(response.body).toBe(expectedResult);
    });
});

// Create
//describe('Post /alarm', () => {
//    it('should create an item', async () => {
//        const res = await request(app)
//            .post('/alarme')
//            .send({ fk_usuario: 1, nome_medicamento: "Doril", posologia: 2, intervalo_doses: 3 });
//        expect(res.statusCode).toEqual(201);
//        expect(res.body).toHaveProperty('id_alarme');
//        expect(res.body.name).toBe('Doril');
//        itemId = res.body.id;
//    });
//});


// Read One
//   it('should get an item by id', async () => {
//     const res = await request(app).get(`/items/${itemId}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('id');
//     expect(res.body.id).toBe(itemId);
//   });