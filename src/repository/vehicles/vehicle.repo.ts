import { PostgresDataSource } from "../../data-source.js";
import { Vehicle } from "../../entity/Vehicle.js";
import { ResponseToolkit, Request } from 'hapi';

const getVehicleByFilter = async (filter: Partial<Vehicle>) => {
    return await PostgresDataSource.manager.findOneBy(Vehicle, filter);
}

const editVehicle = async (vehicle: Partial<Vehicle>) => {
    return await PostgresDataSource.manager.update<Partial<Vehicle>>(Vehicle, vehicle.id, vehicle)
}

const saveVehicle = (vehicle: Partial<Vehicle>) => {
    const newVehicle = PostgresDataSource.manager.create(Vehicle, vehicle);
    return PostgresDataSource.manager.save<Partial<Vehicle>>(newVehicle);
}

const createVehicle = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    try {
        const { model, color, licensePlate, userId, event } = payload as Partial<Vehicle>;
        const vehicle = await getVehicleByFilter({ licensePlate: licensePlate })
        if (vehicle) {
            return h
                .response({
                    msg: 'Placa ja cadastrada',
                    data: vehicle
                })
                .code(200);
        }
        else {
            const savedVehicle = saveVehicle({ model, color, licensePlate, userId, event });
            return h
                .response({
                    msg: "veículo criado com sucesso",
                    data: savedVehicle
                })
                .code(201);
        }
    } catch (error) {
        return h
            .response({
                error: error.message
            })
            .code(400);
    }
}

const getVehiclesByUser = async ({ params: { userId } }: Request, h: ResponseToolkit, err?: Error) => {    
    try {
        const vehicles = await PostgresDataSource.manager.findBy(Vehicle, { userId: Number(userId) })
        
        return h
            .response({
                msg: 'Veículos encontrados.',
                data: vehicles
            })
            .code(200);
    } catch (error) {
        return h
            .response({
                error: error.message
            })
            .code(400);
    }
}

export { getVehiclesByUser, createVehicle }