const request = require('supertest');
const app = require('../app');

describe("API Controller Tests", () =>{
    it("GET / should return all todos", async () =>{
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
    it("POST / ", async () =>{
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(200);
    });
})