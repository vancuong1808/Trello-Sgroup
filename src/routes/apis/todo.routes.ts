import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import CardValidator from '../../validators/card.validator.ts';
import todoController from '../../controllers/todo.controller.ts';
const todoRoute = express.Router();

todoRoute.get('/todo', authenticate, RequiredPermissions(Permissions.VIEW_TODO), todoController.getAllTodos);

todoRoute.get('/todo/:todoId', authenticate, RequiredPermissions(Permissions.VIEW_TODO), todoController.getTodoById);

todoRoute.post('/todo', authenticate, RequiredPermissions(Permissions.ADD_TODO), CardValidator.validateAddTodo, validateHandler, todoController.addTodo);

todoRoute.put('/todo/:todoId', authenticate, RequiredPermissions(Permissions.UPDATE_TODO), CardValidator.validateUpdateTodo, validateHandler, todoController.updateTodo);

todoRoute.delete('/todo/:todoId', authenticate, RequiredPermissions(Permissions.DELETE_TODO), todoController.deleteTodo);

export default todoRoute;
