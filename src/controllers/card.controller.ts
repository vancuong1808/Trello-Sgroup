import { NextFunction, Request, Response } from "express";
import { CardBody } from "../common/typings/custom.interface";
import responseHandler from "../handlers/response.handler";
import CardService from "../services/card.service";

class CardController {
    async getAllCards( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const boardId = Number( req.params.boardId );
            const listId = Number( req.params.listId );
            const result = await CardService.getAllCards( boardId, listId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCardById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const boardId = Number( req.params.boardId );
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const result = await CardService.getCardById( boardId, listId, cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const boardId = Number( req.params.boardId );
            const listId = Number( req.params.listId );
            const cardBody : CardBody = req.body;
            const result = await CardService.addCard( boardId, listId, cardBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const cardBody : Partial<CardBody> = req.body;
            const result = await CardService.updateCard( listId, cardId, cardBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const result = await CardService.deleteCard( listId, cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async uploadAttachment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const file  = req.file;
            if (!file) {
                responseHandler.badRequest( res, "File is required" );
                return;
            }
            const result = await CardService.addAttachment( listId, cardId, file );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteAttachment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const attachmentId = Number( req.params.attachmentId );
            const result = await CardService.deleteAttachment( listId, cardId, attachmentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateAttachment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const attachmentId = Number( req.params.attachmentId );
            const file  = req.file;
            if (!file) {
                responseHandler.badRequest( res, "File is required" );
                return;
            }
            const result = await CardService.updateAttachment( listId, cardId, attachmentId, file );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListBody = req.body;
            const result = await CardService.addTodoList( cardId, listId, todoListBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const result = await CardService.getAllTodoLists( listId, cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getTodoListById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const result = await CardService.getTodoListById( cardId, listId, todoListId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoListBody = req.body;
            const result = await CardService.updateTodoList( cardId, listId, todoListId, todoListBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const result = await CardService.deleteTodoList( cardId, listId, todoListId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoBody = req.body;
            const result = await CardService.addTodo( cardId, listId, todoListId, todoBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getTodoById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoId = Number( req.params.todoId );
            const result = await CardService.getTodoById( cardId, listId, todoListId, todoId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getAllTodos( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const result = await CardService.getTodosByTodoListId( listId, cardId, todoListId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoId = Number( req.params.todoId );
            const todoBody = req.body;
            const result = await CardService.updateTodo( cardId, listId, todoListId, todoId, todoBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoId = Number( req.params.todoId );
            const result = await CardService.deleteTodo( cardId, listId, todoListId, todoId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async checkTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const listId = Number( req.params.listId );
            const todoListId = Number( req.params.todoListId );
            const todoId = Number( req.params.todoId );
            const result = await CardService.checkTodo( cardId, listId, todoListId, todoId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addComment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const commentBody = req.body;
            const result = await CardService.addComment( listId, cardId, commentBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCommentsByCardId( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const result = await CardService.getCommentsByCardId( listId, cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCommentById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const commentId = Number( req.params.commentId );
            const result = await CardService.getCommentById( listId, cardId, commentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateComment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const commentId = Number( req.params.commentId );
            const commentBody = req.body;
            const result = await CardService.updateComment( listId, cardId, commentId, commentBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteComment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const cardId = Number( req.params.cardId );
            const commentId = Number( req.params.commentId );
            const result = await CardService.deleteComment( listId, cardId, commentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }


}
export default new CardController();
