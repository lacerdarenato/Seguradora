import { PostgresDataSource } from "../../data-source.js";
import { Accident } from "../../entity/Accident.js";
import { ResponseToolkit, Request } from 'hapi';


const createAccident = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    const { sinister, date } = payload as Partial<Accident>;
    const accident: Partial<Accident> = PostgresDataSource.manager.create(Accident,
        { sinister, date }
    );
    return PostgresDataSource.manager.save<Partial<Accident>>(accident);
}

export { createAccident }