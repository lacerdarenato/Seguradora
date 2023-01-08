import { PostgresDataSource } from "../../data-source.js";
import { ResponseToolkit, Request } from 'hapi';
import { Accident } from "../../entity/Accident.js";
import { User } from '../../entity/User.js'
import { addThirdTeste } from '../users/user.repo.js'

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

const createAccidentTeste = async (date, vehicles, thirdList: Array<Partial<User>>) => {

    let hasAllThird;
    let findedThirdList;

    thirdList.forEach(async (third) => {
        const user = await addThirdTeste(third)
        if (user) {
            findedThirdList.push(user)
        }
        else {
            hasAllThird = false;
            return
        }
    });

    return thirdList
    // const accident: Partial<Accident> = PostgresDataSource.manager.create(Accident,
    //     { date, vehicles }
    // );
    // const savedAccident = await PostgresDataSource.manager.save<Partial<Accident>>(accident);

}

export { createAccidentTeste, createAccident }