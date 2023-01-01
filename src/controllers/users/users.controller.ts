import { PostgresDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import { ResponseToolkit, Request } from 'hapi'


export const userController = () => {
    return [
        {
            method: 'GET',
            path: '/users',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.find(User);

            }
        },
    ]
}