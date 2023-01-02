import { PostgresDataSource } from "../../data-source.js";
import { Vehicle } from "../../entity/Vehicle.js";
import { ResponseToolkit, Request } from 'hapi'


export const vehicleController = () => {
    return [
        {
            method: 'GET',
            path: '/vehicles',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.find(Vehicle);

            }
        },
    ]
}