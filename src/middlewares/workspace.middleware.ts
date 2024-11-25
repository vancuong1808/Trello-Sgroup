import UserRepository from '../repositories/user.repository';
import { CustomRequest } from '../common/typings/custom.interface.d';
import WorkspaceRepository from '../repositories/workspace.repository';
import UserWorkspaceRepository from '../repositories/userworkspace.repository';
import { NextFunction, Response } from 'express';
import { badRequestError, forbiddenError, notFoundError } from "../handlers/errors/customError";

export const IsMemberOfWorkspace : (
    req : CustomRequest,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : CustomRequest, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const userId : string = typeof req.user === "string" ? req.user : req.user?.userId;
        const workspaceId : number = Number( req.params.workspaceId );
        if ( !Number( userId ) ) {
            next( new forbiddenError("You are not a member of this workspace") );
        }
        if ( !workspaceId ) {
            next( new forbiddenError("You are not a member of this workspaceId") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistWorkspace = await WorkspaceRepository.getWorkspaceById( workspaceId );
        if ( !isExistWorkspace ) {
            next( new notFoundError("Workspace not found") );
        }
        const isMember = await UserWorkspaceRepository.getMemberById( workspaceId , Number( userId ) );
        if ( !isMember ) {
            next( new forbiddenError("You are not a member of this workspace") );
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`permission middleware has error : ${ error }`))
    }
}
