import "reflect-metadata"
import { DataSource } from "typeorm"
import 'colors'

import dotenv from "dotenv";
dotenv.config()

import { Accident, User, Vehicle } from "./entity/index.js";

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABSE_URI,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [
        User,
        Vehicle,
        Accident
    ],
    migrations: [],
    subscribers: [],
})

const PostgresDataSourceTest = new DataSource({
    type: "postgres",
    host: process.env.DATABSE_URI,
    port: 5432,
    username: 'test',
    password: 'test',
    database: "postgres",
    synchronize: true,
    entities: [
        User,
        Vehicle,
        Accident
    ],
    migrations: [],
    subscribers: [],
})

await PostgresDataSource.initialize()
    .then(async () => {
        console.log(`PostgresDataSource has been initialized`.blue);

    }).catch(error => {
        console.error(error, `\nPostgresDataSource initialization error.`.red);
    })

// await PostgresDataSource.synchronize()
//     .then(async () => { console.log(`Sincronizando banco.`) })
//     .catch((error) => { console.error(`Erro ao sincronizar banco.`, error) })

export { PostgresDataSource, PostgresDataSourceTest }
