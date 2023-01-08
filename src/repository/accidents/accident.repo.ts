import { PostgresDataSource } from "../../data-source.js";
import { ResponseToolkit, Request } from 'hapi';
import { Accident } from "../../entity/Accident.js";
import { Vehicle } from '../../entity/Vehicle.js'


const createAccident = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    try {
        const { date, vehicles } = payload as Partial<Accident>;
        const accident: Partial<Accident> = PostgresDataSource.manager.create(Accident,
            { date, vehicles }
        );
        const savedAccident = await PostgresDataSource.manager.save<Partial<Accident>>(accident);
        return h
            .response({
                msg: "Acidente registrado com sucesso.",
                data: savedAccident
            }).code(201);
    } catch (error) {
        return h
            .response({
                error: error.message
            }).code(400);
    }
}

export { createAccident }