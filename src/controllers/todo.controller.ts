import { Request, Response, NextFunction } from 'express';
import responseHandler from '../handlers/response.handler';
import TodoService from '../services/todo.service';
import { TodoBody } from '../common/typings/custom.interface';

class TodoController {
    
    async addTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoListId = Number( req.body.todolistId );
            const todoBody : TodoBody = req.body;
            const result = await TodoService.addTodo( todoListId, todoBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getTodoById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoId = Number( req.params.todoId );
            const result = await TodoService.getTodoById( todoId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getAllTodos( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const result = await TodoService.getAllTodos( );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoId = Number( req.params.todoId );
            const todoBody : Partial<TodoBody> = req.body;
            const result = await TodoService.updateTodo( todoId, todoBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoId = Number( req.params.todoId );
            const result = await TodoService.deleteTodo( todoId );
    responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async checkTodo( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const todoId = Number( req.params.todoId );
            const result = await TodoService.checkTodo( todoId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }
}

export default new TodoController();
