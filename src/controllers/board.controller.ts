import { Board } from './../orm/entities/board.entity';
import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import { BoardBody } from "../common/typings/custom.interface";
import boardService from "../services/board.service";

class BoardController {
    async getAllBoards( req : Request, res : Response, next : NextFunction ) {
        try {
            const boards = await boardService.getAllBoards();
            responseHandler.ok( res, boards.message, boards.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getBoardById( req : Request, res : Response, next : NextFunction ) {
        try {
            const boardId = Number( req.params.id );
            const board = await boardService.getBoardById( boardId );
            responseHandler.ok( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async createBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const boardBody : BoardBody = req.body;
            const board = await boardService.createBoard( boardBody );
            responseHandler.created( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async updateBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const boardId = Number( req.params.id );
            const boardBody : BoardBody = req.body;
            const board = await boardService.updateBoard( boardId, boardBody );
            responseHandler.ok( res, board.message, board.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async deleteBoard( req : Request, res : Response, next : NextFunction ) {
        try {
            const boardId = Number( req.params.id );
            const result = await boardService.deleteBoard( boardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new BoardController();
