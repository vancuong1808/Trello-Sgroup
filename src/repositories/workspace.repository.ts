import { mysqlSource } from '../configs/data-source.config.ts';
import { badRequestError } from "../handlers/errors/customError";
import { WorkSpace } from '../orm/entities/workspace.entity';

class WorkspaceRepository {

    private readonly workspaceRepository = mysqlSource.getRepository(WorkSpace);
    async getAllWorkspace() : Promise<WorkSpace[] | null> {
        try {
            const workspaces = await this.workspaceRepository.find({
                select : ["id", "workspaceName"],
                order : {
                    id : "ASC"
                }
            });
            return workspaces;
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }

    async getWorkspaceById( id : number ) : Promise<WorkSpace | null> {
        try {
            const workspace = await this.workspaceRepository.findOne({
                select : ["id", "workspaceName"],
                where : {
                    id : id
                }
            });
            return workspace;
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }

    async getWorkspaceByName( name : string ) : Promise<WorkSpace | null> {
        try {
            const workspace = await this.workspaceRepository.findOne({
                select : ["id", "workspaceName"],
                where : {
                    workspaceName : name
                }
            });
            return workspace;
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }

    async createWorkspace( workspace : WorkSpace ) : Promise<WorkSpace | null> {
        try {
            const newWorkspace = await this.workspaceRepository.create( workspace );
            await this.workspaceRepository.save( newWorkspace );
            return newWorkspace;
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }

    async updateWorkspace( id : number, workspace : Partial<WorkSpace> ) : Promise<void> {
        try {
            await this.workspaceRepository.update( id , workspace );
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }

    async deleteWorkspace( id : number ) : Promise<void> {
        try {
            await this.workspaceRepository.delete( id );
        } catch ( error : unknown ) {
            throw new badRequestError(`WorkspaceRepository has error : ${ error }`);
        }
    }
}   

export default new WorkspaceRepository();