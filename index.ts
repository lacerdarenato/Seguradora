import * as Hapi from '@hapi/hapi';
import { port, url } from './config'

const init = async () => {

    const server = Hapi.server({
        port: port,
        host: url
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();