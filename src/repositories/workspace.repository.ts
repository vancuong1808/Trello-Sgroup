import { mysqlSource } from '../configs/data-source.config.ts';
import { badRequestError } from "../handlers/errors/customError";
import { WorkSpace } from '../orm/entities/workspace.entity';

class WorkspaceRepository {

    private readonly workspaceRepository = mysqlSource.getRepository(WorkSpace);
    async getAllWorkspace() : Promise<WorkSpace[] | null> {
        const workspaces = await this.workspaceRepository.find({
            select : ["id", "workspaceName"],
            order : {
                id : "ASC"
            }
        });
        return workspaces;
    }

    async getWorkspaceById( id : number ) : Promise<WorkSpace | null> {
        const workspace = await this.workspaceRepository.findOne({
            select : ["id", "workspaceName"],
            where : {
                id : id
            }
        });
        return workspace;
    }

    async getWorkspaceByName( name : string ) : Promise<WorkSpace | null> {
        const workspace = await this.workspaceRepository.findOne({
            select : ["id", "workspaceName"],
            where : {
                workspaceName : name
            }
        });
        return workspace;
    }

    async addWorkspace( workspace : WorkSpace ) : Promise<WorkSpace | null> {
        const newWorkspace = await this.workspaceRepository.create( workspace );
        await this.workspaceRepository.save( newWorkspace );
        return newWorkspace;
    }

    async updateWorkspace( id : number, workspace : Partial<WorkSpace> ) : Promise<void> {
        await this.workspaceRepository.update( id , workspace );
    }

    async deleteWorkspace( id : number ) : Promise<void> {
        await this.workspaceRepository.delete( id );
    }
}   

export default new WorkspaceRepository();
