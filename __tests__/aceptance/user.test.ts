// import { PostgresDataSourceTest } from "../../src/data-source";
import request from 'supertest';
import server from "../../src/server";

const testuser = {
    "cpf": "12312312000",
    "firstName": "Renato",
    "lastName": "Lacerda",
    "phone": "1111",
}

// beforeAll(async () => {
//     // await PostgresDataSourceTest.initialize()
//     await server.start()
// })

// afterAll(async () => {
//     // await PostgresDataSourceTest.dropDatabase()
// })

it('shold be no user initialy', async () => {
    const response = await request(server).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
})

it('create user without CPF', async () => {
    const response = await request(server).post('/users/client');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        "error": "null value in column \"cpf\" of relation \"user\" violates not-null constraint"
    });
})

it('first user successfuly created', async () => {
    const response = await request(server).post('/users/client');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        "msg": "Cliente cadastrado com sucesso",
        "data": {
            ...testuser,
            "id": 1
        }
    });
})