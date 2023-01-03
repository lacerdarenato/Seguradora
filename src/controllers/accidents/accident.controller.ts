import { PostgresDataSource } from "../../data-source.js";
import { Accident } from "../../entity/Accident.js";
import { ResponseToolkit, Request } from 'hapi'


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
            handler: ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
                const { sinister, date } = payload as Partial<Accident>;
                const accident: Partial<Accident> = PostgresDataSource.manager.create(Accident,
                    { sinister, date }
                );
                return PostgresDataSource.manager.save<Partial<Accident>>(accident);
            }
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