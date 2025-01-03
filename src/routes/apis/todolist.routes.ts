import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import { CheckMemberInTodoList, CheckMemberInCard } from '../../middlewares/checkMember.middleware.ts';
import CardValidator from '../../validators/card.validator.ts';
import todoListController from '../../controllers/todolist.controller.ts';
const todoListRoute = express.Router();

todoListRoute.get('/todolist', authenticate, RequiredPermissions(Permissions.VIEW_TODO_LIST), todoListController.getAllTodoLists);

todoListRoute.get('/todolist/:todoListId', authenticate, RequiredPermissions(Permissions.VIEW_TODO_LIST), todoListController.getTodoListById);

todoListRoute.post('/todolist', authenticate, CheckMemberInCard, RequiredPermissions(Permissions.ADD_TODO_LIST), CardValidator.validateAddTodoList, validateHandler, todoListController.addTodoList);

todoListRoute.put('/todolist/:todoListId', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.UPDATE_TODO_LIST), CardValidator.validateUpdateTodoList, validateHandler, todoListController.updateTodoList);

todoListRoute.delete('/todolist/:todoListId', authenticate, CheckMemberInTodoList, RequiredPermissions(Permissions.DELETE_TODO_LIST), todoListController.deleteTodoList);

export default todoListRoute;
