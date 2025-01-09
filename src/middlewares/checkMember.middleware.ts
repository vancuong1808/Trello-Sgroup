import { Board } from './../orm/entities/board.entity';
import { NextFunction, Response } from 'express';
import { UserBoard } from './../orm/entities/userboard.entity';
import UserRepository from '../repositories/user.repository';
import { CustomRequest } from '../common/typings/custom.interface.d';
import BoardRepository from '../repositories/board.repository';
import UserBoardRepository from '../repositories/userboard.repository';
import WorkspaceRepository from '../repositories/workspace.repository';
import UserWorkspaceRepository from '../repositories/userworkspace.repository';
import ListRepository from '../repositories/list.repository';
import CardRepository from '../repositories/card.repository';
import todolistRepository from '../repositories/todolist.repository';
import TodoRepository from '../repositories/todo.repository';
import CommentRepository from '../repositories/comment.repository';
import { badRequestError, forbiddenError, notFoundError } from "../handlers/errors/customError";
import { Console } from 'console';

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
        const boardId : number = Number( req.params.boardId ) || Number( req.body.boardId );
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
        req.roleOfUser = [];
        const isExistMemberOfBoard = await UserBoardRepository.getMemberById( boardId, Number(userId) );
        if ( isExistMemberOfBoard ) {
            req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
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
        const workspaceId : number = Number( req.params.workspaceId ) || Number( req.body.workspaceId );
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
        req.roleOfUser = [];
        const isExistMemberOfWorkspace = await UserWorkspaceRepository.getMemberById( workspaceId, Number(userId) );
        if ( isExistMemberOfWorkspace ) {
            req.roleOfUser?.push( isExistMemberOfWorkspace!.role.id );
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
        const listId : number = Number( req.params.listId ) || Number( req.body.listId );
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
        const check = isExistList?.board.userBoards.some( ( userBoard : UserBoard ) => userBoard.user.id == Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this board") );
        }
        const boardId = isExistList?.board.id;
        req.roleOfUser = [];
        if ( boardId ) {
            const isExistMemberOfBoard = await UserBoardRepository.getMemberById(  boardId, Number(userId) ); 
            if ( isExistMemberOfBoard ) {
                req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
            }   
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`permission middleware has error : ${ error }`))
    }
}

export const CheckMemberInCard : (
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
        const cardId : number = Number( req.params.cardId ) || Number( req.body.cardId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !cardId ) {
            next( new badRequestError("cardId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistCard = await CardRepository.getCardById( cardId );
        if ( !isExistCard ) {
            next( new notFoundError("Card not found") );
        }
        const check = isExistCard?.users.some( ( user ) => user.id === Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this Card") );
        }
        const listId = isExistCard!.list.id;
        const isExistList = await ListRepository.getListById( listId );
        if ( !isExistList ) {
            next( new notFoundError("List not found") );
        }
        req.roleOfUser = [];
        const boardId = isExistList?.board.id;
        if ( boardId ) {
            const isExistMemberOfBoard = await UserBoardRepository.getMemberById( boardId, Number(userId) );
            if ( isExistMemberOfBoard ) {
                req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
            }
        }
        return next();
    } catch( error : unknown ) {
        next( new badRequestError(`checkMember middleware has error : ${ error }`))
    }
}

export const CheckMemberInTodoList : (
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
        const todoListId : number = Number( req.params.todolistId ) || Number( req.body.todolistId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !todoListId ) {
            next( new badRequestError("todoListId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistTodoList = await todolistRepository.getTodoListById( todoListId );
        if ( !isExistTodoList ) {
            next( new notFoundError("TodoList not found") );
        }
        const check = isExistTodoList?.card.users.some( ( user ) => user.id === Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this Card") );
        }
        const listId = isExistTodoList!.card.list.id;
        const isExistList = await ListRepository.getListById( listId );
        if ( !isExistList ) {
            next( new notFoundError("List not found") );
        }
        req.roleOfUser = [];
        const boardId = isExistList?.board.id;
        if ( boardId ) {
            const isExistMemberOfBoard = await UserBoardRepository.getMemberById(  boardId, Number(userId) ); 
            if ( isExistMemberOfBoard ) {
                req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
            }   
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`checkMember middleware has error : ${ error }`))
    }
}

export const CheckMemberInTodo : (
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
        const todoId : number = Number( req.params.todoId ) || Number( req.body.todoId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !todoId ) {
            next( new badRequestError("todoId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistTodo = await TodoRepository.getTodoById( todoId );
        if ( !isExistTodo ) {
            next( new notFoundError("Todo not found") );
        }
        const isExistTodoList = await todolistRepository.getTodoListById( isExistTodo!.todoList.id );
        if ( !isExistTodoList ) {
            next( new notFoundError("TodoList not found") );
        }
        const check = isExistTodoList?.card.users.some( ( user ) => user.id === Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this Card") );
        }
        const listId = isExistTodoList!.card.list.id;
        const isExistList = await ListRepository.getListById( listId );
        if ( !isExistList ) {
            next( new notFoundError("List not found") );
        }
        req.roleOfUser = [];
        const boardId = isExistList?.board.id;
        if ( boardId ) {
            const isExistMemberOfBoard = await UserBoardRepository.getMemberById(  boardId, Number(userId) ); 
            if ( isExistMemberOfBoard ) {
                req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
            }   
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`checkMember middleware has error : ${ error }`))
    }
}

export const CheckMemberInComment : (
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
        const commentId : number = Number( req.params.commentId ) || Number( req.body.commentId );
        if ( !userId ) {
            next( new badRequestError("userId is not valid") );
        }
        if ( !commentId ) {
            next( new badRequestError("commentId is not valid") );
        }
        const isExistUser = await UserRepository.getUserById( Number( userId ) );
        if ( !isExistUser ) {
            next( new notFoundError("User not found") );
        }
        const isExistComment = await CommentRepository.getCommentById( commentId );
        if ( !isExistComment ) {
            next( new notFoundError("Comment not found") );
        }
        const check = isExistComment?.card.users.some( ( user ) => user.id === Number( userId ) );
        if ( !check ) {
            next( new forbiddenError("You are not a member of this Card") );
        }
        const listId = isExistComment!.card.list.id;
        const isExistList = await ListRepository.getListById( listId );
        if ( !isExistList ) {
            next( new notFoundError("List not found") );
        }
        req.roleOfUser = [];
        const boardId = isExistList?.board.id;
        if ( boardId ) {
            const isExistMemberOfBoard = await UserBoardRepository.getMemberById( boardId, Number(userId) );
            if ( isExistMemberOfBoard ) {
                req.roleOfUser?.push( isExistMemberOfBoard!.role.id );
            }
        }
        return next();
    } catch (error : unknown) {
        next( new badRequestError(`checkMember middleware has error : ${ error }`))
    }
}