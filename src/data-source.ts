import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"

import dotenv from "dotenv";
dotenv.config()


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABSE_URI,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "postgres",
    entities: [User],
    migrations: [],
    subscribers: [],
})

export { PostgresDataSource }
