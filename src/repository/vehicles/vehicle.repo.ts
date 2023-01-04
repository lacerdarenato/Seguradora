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
    const { model, color, licensePlate, userId, event } = payload as Partial<Vehicle>;
    const vehicle = await getVehicleByFilter({ licensePlate: licensePlate })
    if (vehicle) {
        return 'Placa ja cadastrada';
    }
    else {
        return saveVehicle({ model, color, licensePlate, userId, event });
    }
}

const getVehiclesByUser = async ({ params: { userId } }: Request, h: ResponseToolkit, err?: Error) => {
    return await PostgresDataSource.manager.findBy(Vehicle, { userId: Number(userId) })
}

export { getVehiclesByUser, createVehicle }