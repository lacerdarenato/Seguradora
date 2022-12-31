import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi'
import 'colors'

const init = async () => {

    const server: Server = Hapi.server({
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit, err?: Error) => {
            return {
                msg: 'hello World'
            }
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