import { mysqlSource } from '../configs/data-source.config.ts';
import { WorkSpace } from '../orm/entities/workspace.entity';
import { Notification } from '../orm/entities/notification.entity';

class WorkspaceRepository {

    private readonly workspaceRepository = mysqlSource.getRepository(WorkSpace);
    private readonly notificationRepository = mysqlSource.getRepository(Notification);
    async getAllWorkspace() : Promise<WorkSpace[] | null> {
        const workspaces = await this.workspaceRepository.find({
            select : ["id", "workspaceName", "createdAt"],
            order : {
                id : "ASC"
            },
            relations : ["boards", "userWorkspaces.user", "userWorkspaces.role"]
        });
        return workspaces;
    }

    async getWorkspaceById( id : number ) : Promise<WorkSpace | null> {
        const workspace = await this.workspaceRepository.findOne({
            select : ["id", "workspaceName"],
            where : {
                id : id
            },
            relations : ["boards", "userWorkspaces.user", "userWorkspaces.role"]
        });
        return workspace;
    }

    async getWorkspaceByName( name : string ) : Promise<WorkSpace | null> {
        const workspace = await this.workspaceRepository.findOne({
            select : ["id", "workspaceName"],
            where : {
                workspaceName : name
            },
            relations : ["boards", "userWorkspaces.user", "userWorkspaces.role"]
        });
        return workspace;
    }
    
    async getWorkspaceRelateWithBoard( workspaceId : number ) : Promise<WorkSpace | null> {
        const workspaces = await this.workspaceRepository.find({
            relations : ["boards"],
            where : {
                id : workspaceId
            }
        });
        return workspaces[0];
    }

    async addWorkspace( workspace : WorkSpace ) : Promise<WorkSpace | null> {
        const newWorkspace = this.workspaceRepository.create( workspace );
        await this.workspaceRepository.save( newWorkspace );
        return newWorkspace;
    }

    async updateWorkspace( id : number, workspace : Partial<WorkSpace> ) : Promise<void> {
        await this.workspaceRepository.update( id , workspace );
    }

    async deleteWorkspace( id : number ) : Promise<void> {
        await this.workspaceRepository.delete( id );
    }

    async addNotification( workspaceId : number, notification : Notification ) : Promise<Notification | null> {
        const workspace = await this.workspaceRepository.findOne({
            where : {
                id : workspaceId
            }
        });
        if( workspace ) {
            notification.workspace = workspace;
            const newNotification = this.notificationRepository.create( notification );
            await this.notificationRepository.save( newNotification );
            return newNotification;
        }
        return null;
    }

    async getNotificationByWorkspaceId( workspaceId : number ) : Promise<Notification[] | null> {
        const notifications = await this.notificationRepository.find({
            where : {
                workspace : {
                    id : workspaceId
                }
            }
        });
        return notifications;
    }

    async getNotificationById( workspaceId : number, notificationId : number ) : Promise<Notification | null> {
        const notification = await this.notificationRepository.findOne({
            where : {
                id : notificationId,
                workspace : {
                    id : workspaceId
                }
            }
        });
        return notification;
    }

    async updateNotification( notificationId : number, notification : Partial<Notification> ) : Promise<void> {
        await this.notificationRepository.update( notificationId, notification );
    }

    async deleteNotification( notificationId : number ) : Promise<void> {
        await this.notificationRepository.delete( notificationId );
    }

}   

export default new WorkspaceRepository();
