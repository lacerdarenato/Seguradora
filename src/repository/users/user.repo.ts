import { PostgresDataSource } from "../../data-source.js";
import { User, UserType } from "../../entity/User.js";
import { ResponseToolkit, Request } from 'hapi';


const getUserByFilter = async (filter: Partial<User>) => {
    return await PostgresDataSource.manager.findOneByOrFail(User, filter);
}

const editUser = async (user: Partial<User>) => {
    return await PostgresDataSource.manager.update<Partial<User>>(User, user.id, user)
}

const saveUser = (user: Partial<User>) => {
    const newUser = PostgresDataSource.manager.create(User, user);
    return PostgresDataSource.manager.save<Partial<User>>(newUser);
}

const editClient = async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
    try {
        const userPayload = Object.assign({ id: Number(id) }, payload)
        const user = await editUser(userPayload)
        return h
            .response({
                msg: 'Cliente alterado com sucesso',
                data: user
            }).code(200);
    } catch (error) {
        return h
            .response({
                error: error.message
            }).code(400);
    }

}

const createClient = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    try {
        const { cpf, firstName, lastName, phone } = payload as Partial<User>;
        const user = await getUserByFilter({ cpf: cpf })
        if (user) {
            if (user.type === UserType.client) {
                return h
                    .response({
                        msg: 'CPF já cadastrado',
                        data: user
                    }).code(200);
            }
            else {
                user.type = UserType.client
                return h
                    .response({
                        msg: 'terceiro migrado para grupo clientes',
                        data: await editUser(user)
                    }).code(200);
            }
        }
        else {
            return h
                .response({
                    msg: 'Cliente cadastrado com sucesso',
                    data: await saveUser({ cpf, firstName, lastName, phone, type: UserType.client })
                }).code(201);
        }

    } catch (error) {
        return h
            .response({
                error: error.message
            }).code(400);
    }
}

const addThird = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    try {
        const { cpf, firstName, lastName, phone } = payload as Partial<User>;
        const user = await getUserByFilter({ cpf: cpf })
        if (user) {
            return h
                .response({
                    msg: 'CPF ja cadastrado para terceiro',
                    data: user
                }).code(200);
        }
        else {
            return h
                .response({
                    msg: 'terceiro cadastrado com sucesso',
                    data: await saveUser({ cpf, firstName, lastName, phone, type: UserType.third })
                }).code(201);
        }
    } catch (error) {
        return h
            .response({
                error: error.message
            }).code(400);
    }
}



export { createClient, addThird, editClient }