const request = require('supertest');
const app = require("../app");

const { Alarme } = require("../models");

jest.mock("../models");

describe('Alarme Controller Tests', () => {
    //Teste para a rota GET '/'
    it('should get all alarmes', async () => {
        const expectedResult = ["test alarme 1", "test alarme 2"];  //arrange
        Alarme.findAll = jest.fn(() => { return expectedResult; }); //act

        const response = await request(app).get('/alarme');
        expect(response.status).toBe(200);                          //assert
        expect(response.body).toStrictEqual(expectedResult);        //assert
    });

    //Teste para a rota POST
    it('should create a new alarme', async () => {
        const alarmeData = {
            name: "New Alarme",
            description: "This is a test alarme"
        };

        const createdAlarme = {
            id: 1,
            name: alarmeData.name,
            description: alarmeData.description
        };

        Alarme.create = jest.fn((data) => {
            return Promise.resolve({ ...createdAlarme });
        });

        const response = await request(app)
            .post('/alarme')
            .send(alarmeData);

        expect(response.status).toBe(201); // 201 Created
        expect(response.body).toEqual({
            message: "Alarme cadastrado com sucesso",
            newAlarme: createdAlarme});
    });

    it('Verifica se o erro do cadastro de alarme esta retornando o codigo 500', async ()=>{
        const alarmeData = {
            name: "New Alarme",
            description: "This is a test alarme"
        };

        

        Alarme.create = jest.fn((data) => {
            throw Error("Erro de teste")
        });

        const response = await request(app)
            .post('/alarme')
            .send(alarmeData);

        expect(response.status).toBe(500); // 500 server error
        expect(response.body).toEqual({
            message: "Erro ao cadastrar alarme",
            error:"Erro de teste"
        });
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