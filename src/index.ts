import * as Hapi from '@hapi/hapi';
import 'colors'

import { userController, mainController, vehicleController, accidentController } from './controllers/index.js';

const init = async () => {

    const server = Hapi.server({
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    });
    
    server.route(mainController())
    server.route(userController())
    server.route(vehicleController())
    server.route(accidentController())
    server.route(mainController())

    await server.start();
    console.log(`Server running on ${server.info.uri}`.green);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();