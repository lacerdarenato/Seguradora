import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi'
import { port, url } from './config';
import 'colors'

const init = async () => {

    const server = Hapi.server({
        port: port,
        host: url
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