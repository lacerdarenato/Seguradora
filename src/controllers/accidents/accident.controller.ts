import { PostgresDataSource } from "../../data-source.js";
import { Accident } from "../../entity/Accident.js";
import { ResponseToolkit, Request } from 'hapi'
import { createAccident } from "../../repository/index.js";


export const accidentController = () => {
    return [
        {
            method: 'GET',
            path: '/accidents',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.find(Accident);

            }
        },
        {
            method: 'GET',
            path: '/accidents/{sinister}',
            handler: ({ params: { sinister } }: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.findOneBy(Accident, { sinister: Number(sinister) });

            }
        },
        {
            method: 'POST',
            path: '/accidents',
            handler: createAccident
        },
        {
            method: 'PATCH',
            path: '/accidents/{sinister}',
            handler: async ({ params: { sinister }, payload }: Request, h: ResponseToolkit, err?: Error) => {
                return await PostgresDataSource.manager.update<Partial<Accident>>(Accident, sinister, payload)
            }
        },
    ]
}