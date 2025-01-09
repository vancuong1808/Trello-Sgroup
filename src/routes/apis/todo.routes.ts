import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import { CheckMemberInTodoList, CheckMemberInTodo } from '../../middlewares/checkMember.middleware.ts';
import todoController from '../../controllers/todo.controller.ts';
import todoValidator from '../../validators/todo.validator.ts';
const todoRoute = express.Router();

todoRoute.get('/todo', authenticate, todoController.getAllTodos);

todoRoute.get('/todo/:todoId', authenticate, todoController.getTodoById);

todoRoute.post('/todo', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.ADD_TODO), todoValidator.validateAddTodo, validateHandler, todoController.addTodo);

todoRoute.put('/todo/:todoId', authenticate, CheckMemberInTodo, RequiredPermissions(Permissions.UPDATE_TODO), todoValidator.validateUpdateTodo, validateHandler, todoController.updateTodo);

todoRoute.put('/todo/check/:todoId', authenticate, CheckMemberInTodo, RequiredPermissions(Permissions.CHECK_TODO), todoController.checkTodo);

todoRoute.delete('/todo/:todoId', authenticate, CheckMemberInTodo, RequiredPermissions(Permissions.DELETE_TODO), todoController.deleteTodo);

export default todoRoute;
