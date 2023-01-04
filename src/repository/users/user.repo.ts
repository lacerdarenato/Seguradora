import { PostgresDataSource } from "../../data-source.js";
import { User, UserType } from "../../entity/User.js";
import { ResponseToolkit, Request } from 'hapi';


const getUserByFilter = async (filter: Partial<User>) => {
    return await PostgresDataSource.manager.findOneBy(User, filter);
}

const editUser = async (user: Partial<User>) => {
    return await PostgresDataSource.manager.update<Partial<User>>(User, user.id, user)
}

const saveUser = (user: Partial<User>) => {
    const newUser = PostgresDataSource.manager.create(User, user);
    return PostgresDataSource.manager.save<Partial<User>>(newUser);
}

const editClient = async ({ params: { id }, payload }: Request, h: ResponseToolkit, err?: Error) => {
    const user = Object.assign({ id: Number(id) }, payload)
    await editUser(user)
}

const createClient = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    const { cpf, firstName, lastName, phone } = payload as Partial<User>;
    const user = await getUserByFilter({ cpf: cpf })
    if (user) {
        if (user.type === UserType.client) {
            return 'CPF já cadastrado'
        }
        else {
            user.type = UserType.client
            return editUser(user)
        }
    }
    else {
        return saveUser({ cpf, firstName, lastName, phone, type: UserType.client })
    }
}

const addThird = async ({ payload }: Request, h: ResponseToolkit, err?: Error) => {
    const { cpf, firstName, lastName, phone } = payload as Partial<User>;
    const user = await getUserByFilter({ cpf: cpf })
    if (user) {
        return user
    }
    else {
        return saveUser({ cpf, firstName, lastName, phone, type: UserType.third })
    }

}



export { createClient, addThird, editClient }