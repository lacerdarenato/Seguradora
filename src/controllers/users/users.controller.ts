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
        {
            method: 'GET',
            path: '/users/{id}',
            handler: ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.findOneBy(User, { id: Number(id) });

            }
        },
        {
            method: 'POST',
            path: '/users',
            handler: ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
                const { cpf, firstName, lastName, phone, type } = payload as Partial<User>;
                const user: Partial<User> = PostgresDataSource.manager.create(User,
                    { cpf, firstName, lastName, phone, type }
                );
                return PostgresDataSource.manager.save<Partial<User>>(user);
            }
        },
        {
            method: 'PATCH',
            path: '/users/{id}',
            handler: async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
                return await PostgresDataSource.manager.update<Partial<User>>(User, id, payload)
            }
        },
    ]
}