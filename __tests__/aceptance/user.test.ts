import { PostgresDataSourceTest } from "../../src/data-source";
import request from 'supertest';
import server from "../../src/server";


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
})