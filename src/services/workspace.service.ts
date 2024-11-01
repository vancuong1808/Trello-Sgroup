import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { WorkSpace } from '../orm/entities/workspace.entity.ts';
import WorkspaceRepository from '../repositories/workspace.repository.ts';
import { WorkSpaceBody } from '../common/typings/custom.interface';

class WorkspaceService {
    async getAllWorkspace() : Promise<Result> {
        try {
            const workspaces = await WorkspaceRepository.getAllWorkspace();
            if (!workspaces) {
                throw new notFoundError("Workspaces not found");
            }
            return new Result( true, 200, "Get all workspaces successful", { workspaces } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async getWorkspaceById( id : number ) : Promise<Result> {
        try {
            const workspace = await WorkspaceRepository.getWorkspaceById( id );
            if (!workspace) {
                throw new notFoundError("Workspace not found");
            }
            return new Result( true, 200, "Get workspace successful", { workspace } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async createWorkspace( workspace : WorkSpaceBody ) : Promise<Result> {
        try {
            const isExistedWorkspace = await WorkspaceRepository.getWorkspaceByName( workspace.workspaceName );
            if (isExistedWorkspace) {
                throw new conflictError("Workspace already exists");
            }
            const newWorkspace = new WorkSpace();
            newWorkspace.workspaceName = workspace.workspaceName;
            await WorkspaceRepository.addWorkspace( newWorkspace );
            return new Result( true, 201, "Workspace created successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async updateWorkspace( workspaceId : number, workspace : Partial<WorkSpace> ) : Promise<Result> {
        try {
            const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
            if (!isExistedWorkspace) {
                throw new notFoundError("Workspace not found");
            }
            await WorkspaceRepository.updateWorkspace( workspaceId, workspace );
            return new Result( true, 200, "Workspace updated successful" );
        } catch (error : unknown) {
            throw error;
        }
    }

    async deleteWorkspace( workspaceId : number ) : Promise<Result> {
        try {
            const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
            if (!isExistedWorkspace) {
                throw new notFoundError("Workspace not found");
            }
            await WorkspaceRepository.deleteWorkspace( workspaceId );
            return new Result( true, 200, "Workspace deleted successful" );
        } catch (error : unknown) {
            throw error;
        }
    }
}

export default new WorkspaceService();