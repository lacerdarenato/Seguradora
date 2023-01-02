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
    ]
}