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
        {
            method: 'GET',
            path: '/vehicles/{id}',
            handler: ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) => {
                return PostgresDataSource.manager.findOneBy(Vehicle, { id: Number(id) });

            }
        },
        {
            method: 'POST',
            path: '/vehicles',
            handler: ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
                const { model, color, licensePlate, user, event } = payload as Partial<Vehicle>;
                const vehicle: Partial<Vehicle> = PostgresDataSource.manager.create(Vehicle,
                    { model, color, licensePlate, user, event }
                );
                return PostgresDataSource.manager.save<Partial<Vehicle>>(vehicle);
            }
        },
        {
            method: 'PATCH',
            path: '/vehicles/{id}',
            handler: async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
                return await PostgresDataSource.manager.update<Partial<Vehicle>>(Vehicle, id, payload)
            }
        },
    ]
}