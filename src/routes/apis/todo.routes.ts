import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import { CheckMemberInTodoList, CheckMemberInTodo } from '../../middlewares/checkMember.middleware.ts';
import CardValidator from '../../validators/card.validator.ts';
import todoController from '../../controllers/todo.controller.ts';
const todoRoute = express.Router();

todoRoute.get('/todo', authenticate, todoController.getAllTodos);

todoRoute.get('/todo/:todoId', authenticate, todoController.getTodoById);

todoRoute.post('/todo', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.ADD_TODO), CardValidator.validateAddTodo, validateHandler, todoController.addTodo);

todoRoute.put('/todo/:todoId', authenticate, CheckMemberInTodo, RequiredPermissions(Permissions.UPDATE_TODO), CardValidator.validateUpdateTodo, validateHandler, todoController.updateTodo);

todoRoute.delete('/todo/:todoId', authenticate, CheckMemberInTodo, RequiredPermissions(Permissions.DELETE_TODO), todoController.deleteTodo);

export default todoRoute;
