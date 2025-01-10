import { Request, Response } from 'express';
import { Client, CustomRequest } from '../common/typings/custom.interface';
import UserworkspaceRepository from '../repositories/userworkspace.repository';
import UserboardRepository from '../repositories/userboard.repository';
import { Notification } from '../orm/entities/notification.entity';
import NotificationRepository from '../repositories/notification.repository';

const clients : Client[] = [];

export const sseHandler : ( req : CustomRequest, res : Response) => void
= async(req: CustomRequest, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Connection','keep-alive');
    res.write('Connected Success\n');
    const userId : string = typeof req.user === "string" ? req.user : req.user?.userId;
    const newClient : Client = {
        id : new Date(),
        userId : Number(userId),
        res
    };
    clients.push(newClient);
    res.on('close', async() => {
        clients.splice(clients.indexOf(newClient), 1);
    });
}

export const sseSendMessage : ( req : CustomRequest, res : Response, message: string ) => void
= async(req: CustomRequest, res: Response, message: string) => {
    clients.forEach( client => {
        client.res.write(`data: ${message}\n\n`);
    })
}

export const sseNotification : ( req : CustomRequest, res : Response, message: string, WorkSpaceId : number, BoardId? : number  ) => void
= async(req: CustomRequest, res: Response, message: string, WorkSpaceId : number, BoardId? : number ) => {
    const clientsToSend : number[] = [];
    const isExistedUserWorkspace = await UserworkspaceRepository.getMembersByWorkspaceId( WorkSpaceId );
    if (!isExistedUserWorkspace) {
        return;
    }
    isExistedUserWorkspace.forEach( userWorkspace => {
        clientsToSend.push( userWorkspace.user.id );
    });
    if (BoardId) {
        const isExistedUserBoard = await UserboardRepository.getMembersByBoardId( BoardId );
        if (!isExistedUserBoard) {
            return;
        }
        isExistedUserBoard.forEach( userBoard => {
            clientsToSend.push( userBoard.user.id );
        });
    }
    const newNotification = new Notification();
    newNotification.description = message;
    await NotificationRepository.addNotification( newNotification );
    const uniqueClients = [...new Set(clientsToSend)];
    clients.forEach( client => {
        if (uniqueClients.includes( client.userId )) {
            client.res.write(`data: ${message}\n\n`);
        }
    });
}
