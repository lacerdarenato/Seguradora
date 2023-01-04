import { PostgresDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import { ResponseToolkit, Request } from 'hapi'
import { createClient, addThird, editClient } from '../../repository/index.js'


export const userController = () => {
    return [
        {
            method: 'GET',
            path: '/users',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.find(User);
            }
        },
        {
            method: 'GET',
            path: '/users/{id}',
            handler: async ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) => {
                return await PostgresDataSource.manager.findOneBy(User, { id: Number(id) });
            }
        },
        {
            method: 'POST',
            path: '/users/client',
            handler: createClient
        },
        {
            method: 'PATCH',
            path: '/users/client/{id}',
            handler: editClient
        },
        {
            method: 'POST',
            path: '/users/third',
            handler: addThird
        },
    ]
}