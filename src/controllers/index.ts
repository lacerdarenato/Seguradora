import { ResponseToolkit, Request } from 'hapi';


export { userController } from "./users/users.controller.js";
export { vehicleController } from './vehicles/vehicle.controller.js';
export { accidentController } from './accidents/accident.controller.js';

export const mainController = () => {
    return [
        {
            method: 'GET',
            path: '/',
            handler: (request: Request, h: ResponseToolkit, err?: Error) => {
                return 'healty';
            }
        },
    ]
}
