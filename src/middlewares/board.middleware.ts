import UserRepository from '../repositories/user.repository';
import { CustomRequest } from '../common/typings/custom.interface.d';
import BoardRepository from '../repositories/board.repository';
import UserBoardRepository from '../repositories/userboard.repository';
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
        const workspaceId : number = Number( req.params.workspaceId );
        const boardId : number = Number( req.params.boardId );
        if ( !userId ) {
            next( new forbiddenError("You are not a member of this board") );
        }
        if ( !workspaceId ) {
            next( new forbiddenError("You are not a member of this workspaceId") );
        }
        if ( !boardId ) {
            next( new forbiddenError("You are not a member of this board") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistBoard = await BoardRepository.getBoardById( workspaceId, boardId );
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
