import "reflect-metadata"
import { DataSource } from "typeorm"

import { Accident, User, Vehicle } from "./entity";

import dotenv from "dotenv";
dotenv.config()


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABSE_URI,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [User, Vehicle, Accident],
    migrations: [],
    subscribers: [],
})

export { PostgresDataSource }
