import { PostgresDataSource } from "../../data-source.js";
import { Accident } from "../../entity/Accident.js";
import { ResponseToolkit, Request } from 'hapi'
import { createAccident, createAccidentTeste } from "../../repository/index.js";


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
            path: '/accidents/{id}',
            handler: ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.findOneBy(Accident, { id: Number(id) });
            }
        },
        {
            method: 'POST',
            path: '/accidents',
            handler: createAccident
        },
        {
            method: 'POST',
            path: '/accidents/teste',
            handler: async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
                try {
                    const { date, vehicles } = payload as Partial<Accident>;
                    const thirdiesList = payload["third"]
                    const teste = await createAccidentTeste(date, vehicles, thirdiesList)
                    return h
                        .response({
                            msg: "Acidente registrado com sucesso.",
                            data: teste
                        }).code(201);
                } catch (error) {
                    return h
                        .response({
                            error: error.message
                        }).code(400);
                }
            }
        },
        {
            method: 'PATCH',
            path: '/accidents/{id}',
            handler: async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
                return await PostgresDataSource.manager.update<Partial<Accident>>(Accident, id, payload)
            }
        },
    ]
}