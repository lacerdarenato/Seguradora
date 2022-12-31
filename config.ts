import dotenv from "dotenv";
dotenv.config()

//Pesquisar pq n aceita conversão

// export const port = parseInt(process.env.DATABASE_PORT) || 3000;
export const dbUri = process.env.DATABSE_URI || 'localhost';
export const dbUsername = process.env.DATABASE_USERNAME;
export const dbPassword = process.env.DATABASE_PASSWORD;