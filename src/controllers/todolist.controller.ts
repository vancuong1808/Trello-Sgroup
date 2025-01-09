import { Request, Response, NextFunction } from 'express';
import responseHandler from '../handlers/response.handler';
import TodoListService from '../services/todolist.service';
import { TodoListBody } from '../common/typings/custom.interface';

class TodoListController {
    
    async addTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const todoListBody : TodoListBody = req.body;
            const result = await TodoListService.addTodoList( cardId, todoListBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getAllTodoLists( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const result = await TodoListService.getAllTodoLists();
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getTodoListById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoListId = Number( req.params.todolistId );
            const result = await TodoListService.getTodoListById( todoListId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoListId = Number( req.params.todolistId );
            const todoListBody : Partial<TodoListBody> = req.body;
            const result = await TodoListService.updateTodoList( todoListId, todoListBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteTodoList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoListId = Number( req.params.todolistId );
            const result = await TodoListService.deleteTodoList( todoListId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }
}

export default new TodoListController();
