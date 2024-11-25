import { Request, Response } from 'express';

export const sseHandler : ( req : Request, res : Response ) => void
= async(req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Connection','keep-alive');

    res.write('Connected Success\n');

    res.on('close', async() => {
        console.log('Client disconnected');
    });
}
