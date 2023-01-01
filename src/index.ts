import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi'
import 'colors'

import { PostgresDataSource } from "./data-source.js"
import { User } from "./entity/User.js"

PostgresDataSource.initialize()
    .then(async () => {
        console.log(`PostgresDataSource has been initialized`);

    }).catch(error => {
        console.error(`Data Source initialization error`, error);
    })

const init = async () => {

    const server = Hapi.server({
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit, err?: Error) => {
            return 'healty'
            
        }
    })

    await server.start();
    console.log(`Server running on ${server.info.uri}`.green);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();