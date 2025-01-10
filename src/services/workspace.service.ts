import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { WorkSpace } from '../orm/entities/workspace.entity.ts';
import { UserWorkSpace } from '../orm/entities/userworkspace.entity.ts';
import WorkspaceRepository from '../repositories/workspace.repository.ts';
import UserRepository from '../repositories/user.repository.ts';
import UserWorkspaceRepository from '../repositories/userworkspace.repository.ts';
import RoleRepository from '../repositories/role.repository.ts';
import { WorkSpaceBody } from '../common/typings/custom.interface';
import { Roles } from '../common/enums/role.ts';
import { JwtPayload } from 'jsonwebtoken';

class WorkspaceService {
    async getAllWorkspace() : Promise<Result> {
        const workspaces = await WorkspaceRepository.getAllWorkspace();
        if (!workspaces) {
            throw new notFoundError("Workspaces not found");
        }
        return new Result( true, 200, "Get all workspaces successful", workspaces );
    }

    async getWorkspaceById( workspaceId : number ) : Promise<Result> {
        const workspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if (!workspace) {
            throw new notFoundError("Workspace not found");
        }
        return new Result( true, 200, "Get workspace successful",  workspace );
    }

    async getWorkspaceByName( name : string ) : Promise<Result> {
        const workspace = await WorkspaceRepository.getWorkspaceByName( name );
        if (!workspace) {
            throw new notFoundError("Workspace not found");
        }
        return new Result( true, 200, "Get workspace successful", { workspace } );
    }

    async addWorkspace( owner : string | JwtPayload, workspace : WorkSpaceBody ) : Promise<Result> {
        const userId : string = typeof owner === "string" ? owner : owner.userId;
        const isExistedUser = await UserRepository.getUserById( Number( userId ) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedWorkspace = await WorkspaceRepository.getWorkspaceByName( workspace.workspaceName );
        if (isExistedWorkspace) {
            throw new conflictError("Workspace already exists");
        }
        const isExistedRole = await RoleRepository.getRoleByName( Roles.WORKSPACE_ADMIN );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const newWorkspace = new WorkSpace();
        newWorkspace.workspaceName = workspace.workspaceName;
        newWorkspace.owner = isExistedUser.username;
        await WorkspaceRepository.addWorkspace( newWorkspace );
        const newUserWorkspace = new UserWorkSpace();
        newUserWorkspace.user = isExistedUser;
        const checkWorkspace = await WorkspaceRepository.getWorkspaceByName( workspace.workspaceName );
        if (!checkWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        newUserWorkspace.workspace = checkWorkspace;
        newUserWorkspace.role = isExistedRole;
        await UserWorkspaceRepository.addMemberToWorkspace( newUserWorkspace );
        return new Result( true, 201, "Workspace created successful");
    }

    async addMemberToWorkspace( workspaceId : number, userId : number ) : Promise<Result> {
        const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if (!isExistedWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedMemberOfWorkspace = await UserWorkspaceRepository.getMemberById( workspaceId, userId ); 
        if (isExistedMemberOfWorkspace) {
            throw new notFoundError("Member of workspace already exists");
        }
        const isExistedRole = await RoleRepository.getRoleByName( Roles.WORKSPACE_MEMBER);
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const newUserWorkspace = new UserWorkSpace();
        newUserWorkspace.user = isExistedUser;
        newUserWorkspace.workspace = isExistedWorkspace;
        newUserWorkspace.role = isExistedRole;
        await UserWorkspaceRepository.addMemberToWorkspace( newUserWorkspace ); 
        return new Result( true, 201, "Member added to workspace successful" );
    }

    async removeMemberFromWorkspace( workspaceId : number, userId : number ) : Promise<Result> {
        const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if (!isExistedWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedMemberOfWorkspace = await UserWorkspaceRepository.getMemberById( workspaceId, userId ); 
        if (!isExistedMemberOfWorkspace) {
            throw new notFoundError("Member of workspace not found");
        }
        await UserWorkspaceRepository.removeMemberFromWorkspace( isExistedMemberOfWorkspace.id );
        return new Result( true, 200, "Member removed from workspace successful" );
    }

    async updateWorkspace( workspaceId : number, workspace : Partial<WorkSpace> ) : Promise<Result> {
        const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if (!isExistedWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        await WorkspaceRepository.updateWorkspace( workspaceId, workspace );
        return new Result( true, 200, "Workspace updated successful" );
    }

    async deleteWorkspace( workspaceId : number ) : Promise<Result> {
        const isExistedWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if (!isExistedWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        await WorkspaceRepository.deleteWorkspace( workspaceId );
        return new Result( true, 200, "Workspace deleted successful" );
    }
}
export default new WorkspaceService();
