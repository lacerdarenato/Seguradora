import { ResponseToolkit, Request } from 'hapi';


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