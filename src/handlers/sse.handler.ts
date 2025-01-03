import { Request, Response } from 'express';
import { Client, CustomRequest } from '../common/typings/custom.interface';

const clients : Client[] = [];

export const sseHandler : ( req : CustomRequest, res : Response) => void
= async(req: CustomRequest, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Connection','keep-alive');
    res.write('Connected Success\n');
    const newClient : Client = {
        id : new Date(),
        res
    };
    clients.push(newClient);
    res.on('close', async() => {
        clients.splice(clients.indexOf(newClient), 1);
        console.log('Client disconnected');
    });
}

export const sseSendMessage : ( req : CustomRequest, res : Response, message: string ) => void
= async(req: CustomRequest, res: Response, message: string) => {
    clients.forEach( client => {
        client.res.write(`data: ${message}\n\n`);
    });
    res.send('Message sent');
}
