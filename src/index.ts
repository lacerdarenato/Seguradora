import * as Hapi from '@hapi/hapi';
import 'colors'

import { userController, mainController } from './controllers/index.js';

import { PostgresDataSource } from "./data-source.js"

await PostgresDataSource.initialize()
    .then(async () => {
        console.log(`PostgresDataSource has been initialized`.blue);

    }).catch(error => {
        console.error(`Data Source initialization error`, error);
    })

const init = async () => {

    const server = Hapi.server({
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    });

    server.route(mainController())
    server.route(userController())

    await server.start();
    console.log(`Server running on ${server.info.uri}`.green);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();