import * as Hapi from '@hapi/hapi';
import { userController, mainController, vehicleController, accidentController } from './controllers/index.js';


const server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST
});

server.route(mainController())
server.route(userController())
server.route(vehicleController())
server.route(accidentController())

export default server