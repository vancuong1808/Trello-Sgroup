import { Response } from 'express';
import workspaceRepository from '../../repositories/workspace.repository.ts';
import { Client } from '../typings/custom.interface';

class SseClients {
    private clients : Client[] = [];

    async addClient(userId : number, workspace : number | string, res: Response) {
        if ( typeof workspace === 'string' ) {
            const getWorkspace = await workspaceRepository.getWorkspaceByName(workspace);
            if ( !getWorkspace ) {
                return;
            }
            workspace = getWorkspace.id;
        }
        if ( this.clients.some( client => client.userId === userId && client.workspaceId === workspace ) ) {
            return;
        }
        const client : Client = { id: new Date(), userId: userId, workspaceId : workspace, res : res };
        this.clients.push(client);
    }

    removeClient(userId : number, workspaceId : number) {
        const client = this.clients.find( client => client.userId === userId && client.workspaceId === workspaceId );
        this.clients = this.clients.filter( _client => _client !== client);
    }

    sendEventMsg(workspaceId : number, message : string) {
        this.clients.forEach( client => {
            if ( client.workspaceId === workspaceId ) {
                client.res.write(`data: ${JSON.stringify(message)}\n\n`);
            }
        });
    }
}
export default new SseClients();
