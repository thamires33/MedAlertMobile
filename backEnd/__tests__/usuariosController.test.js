const request = require('supertest');
const app = require("../app");

const { Usuario } = require("../models");

jest.mock("../models");

describe('Usuario Controller Tests', () => {
    //Teste para a rota GET '/'
    it('should get all Users', async () => {
        const expectedResult = ["user1", "user2"];  //arrange
        Usuario.findAll = jest.fn(() => { return expectedResult; }); //act

        const response = await request(app).get('/usuario');
        expect(response.status).toBe(200);                          //assert
        expect(response.body).toStrictEqual(expectedResult);        //assert
    });

});