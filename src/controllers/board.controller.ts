import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import { CustomRequest, BoardBody } from "../common/typings/custom.interface";
import boardService from "../services/board.service";

class BoardController {
    async getAllBoards( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boards = await boardService.getAllBoards( workspaceId );
            responseHandler.ok( res, boards.message, boards.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getBoardById( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardId = Number( req.params.boardId );
            const board = await boardService.getBoardById( workspaceId, boardId );
            responseHandler.ok( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async addBoard( req : CustomRequest, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardBody : BoardBody = req.body;
            const userId: string = typeof req.user === "string" ? req.user : req.user?.userId;
            const board = await boardService.addBoard( userId, workspaceId, boardBody );
            responseHandler.created( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async updateBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardId = Number( req.params.boardId );
            const boardBody : BoardBody = req.body;
            const board = await boardService.updateBoard( workspaceId, boardId, boardBody );
            responseHandler.ok( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async deleteBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardId = Number( req.params.boardId );
            const result = await boardService.deleteBoard( workspaceId, boardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async addMemberToBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardId = Number( req.params.boardId );
            const userId = Number( req.params.userId );
            const result = await boardService.addMemberToBoard( workspaceId, boardId, userId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async removeMemberFromBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const workspaceId = Number( req.params.workspaceId );
            const boardId = Number( req.params.boardId );
            const userId = Number( req.params.userId );
            const result = await boardService.removeMemberFromBoard( workspaceId, boardId, userId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new BoardController();
