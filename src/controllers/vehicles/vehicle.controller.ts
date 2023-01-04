import { PostgresDataSource } from "../../data-source.js";
import { ResponseToolkit, Request } from 'hapi'

import { Vehicle } from "../../entity/Vehicle.js";

import { createVehicle, getVehiclesByUser } from "../../repository/index.js";


export const vehicleController = () => {
    return [
        {
            method: 'GET',
            path: '/vehicles',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.find(Vehicle);

            }
        },
        {
            method: 'GET',
            path: '/vehicles/{id}',
            handler: ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.findOneBy(Vehicle, { id: Number(id) });

            }
        },
        {
            method: 'GET',
            path: '/vehicles/user/{userId}',
            handler: getVehiclesByUser
        },
        {
            method: 'POST',
            path: '/vehicles',
            handler: createVehicle

            
        },
        {
            method: 'PATCH',
            path: '/vehicles/{id}',
            handler: async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
                const teste = await PostgresDataSource.manager.update<Partial<Vehicle>>(Vehicle, id, payload)
                console.log(teste)
                return teste
            }
        },
    ]
}