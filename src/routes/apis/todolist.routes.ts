import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import { CheckMemberInTodoList, CheckMemberInCard } from '../../middlewares/checkMember.middleware.ts';
import todoListController from '../../controllers/todolist.controller.ts';
import todolistValidator from '../../validators/todolist.validator.ts';
const todoListRoute = express.Router();

todoListRoute.get('/todolist', authenticate, todoListController.getAllTodoLists);

todoListRoute.get('/todolist/:todolistId', authenticate, todoListController.getTodoListById);

todoListRoute.post('/todolist', authenticate, CheckMemberInCard, RequiredPermissions(Permissions.ADD_TODO_LIST), todolistValidator.validateAddTodoList, validateHandler, todoListController.addTodoList);

todoListRoute.put('/todolist/:todolistId', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.UPDATE_TODO_LIST), todolistValidator.validateUpdateTodoList, validateHandler, todoListController.updateTodoList);

todoListRoute.delete('/todolist/:todolistId', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.DELETE_TODO_LIST), todoListController.deleteTodoList);

export default todoListRoute;
