import { UserBoard } from './../orm/entities/userboard.entity';
import UserRepository from '../repositories/user.repository';
import { CustomRequest } from '../common/typings/custom.interface.d';
import BoardRepository from '../repositories/board.repository';
import UserBoardRepository from '../repositories/userboard.repository';
import WorkspaceRepository from '../repositories/workspace.repository';
import UserWorkspaceRepository from '../repositories/userworkspace.repository';
import ListRepository from '../repositories/list.repository';
import { NextFunction, Response } from 'express';
import { badRequestError, forbiddenError, notFoundError } from "../handlers/errors/customError";

export const IsMemberOfBoard : (
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
        const boardId : number = Number( req.params.boardId ) == null ? Number( req.body.boardId ) : Number( req.params.boardId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !boardId ) {
            next( new badRequestError("boardId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistBoard = await BoardRepository.getBoardById( boardId );
        if ( !isExistBoard ) {
            next( new notFoundError("Board not found") );
        }
        const isMember = await UserBoardRepository.getMemberById( boardId , Number( userId ) );
        if ( !isMember ) {
            next( new forbiddenError("You are not a member of this board") );
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`permission middleware has error : ${ error }`))
    }
}

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
        const workspaceId : number = Number( req.params.workspaceId ) == null ? Number( req.body.workspaceId ) : Number( req.params.workspaceId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !workspaceId ) {
            next( new badRequestError("workspaceId is not valid") );
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

export const CheckMemberInList : (
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
        const listId : number = Number( req.params.listId ) == null ? Number( req.body.listId ) : Number( req.params.listId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !listId ) {
            next( new badRequestError("listId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistList = await ListRepository.getListById( listId );
        if ( !isExistList ) {
            next( new notFoundError("List not found") );
        }
        const check = isExistList?.board.userBoards.some( ( userBoard : UserBoard ) => userBoard.id === Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this board") );
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`permission middleware has error : ${ error }`))
    }
}
