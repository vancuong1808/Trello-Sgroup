import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import cardController from "../../controllers/card.controller";
import { validateHandler } from "../../handlers/validator.handler.ts";
import { AttachUploadSingleMiddleware } from "../../middlewares/attachmentUpload.middleware.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { IsMemberOfBoard } from "../../middlewares/board.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { IsMemberOfWorkspace } from "../../middlewares/workspace.middleware.ts";
import { validateCard, validateTodo, validateComment, validateTodoList } from "../../validators/card.validator.ts";
const cardRoute = express.Router();

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/get/", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getAllCards );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/get/:cardId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getCardById );

cardRoute.post("/:workspaceId/b/:boardId/l/:listId/c/add", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_CARD ), validateCard, validateHandler, cardController.addCard );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/update/:cardId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_CARD ), validateCard, validateHandler, cardController.updateCard );

cardRoute.delete("/:workspaceId/b/:boardId/l/:listId/c/delete/:cardId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_CARD ), cardController.deleteCard );

cardRoute.post("/:workspaceId/b/:boardId/l/:listId/c/:cardId/attachment/upload", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPLOAD_ATTACHMENT ), AttachUploadSingleMiddleware, cardController.uploadAttachment );

cardRoute.delete("/:workspaceId/b/:boardId/l/:listId/c/:cardId/attachment/delete/:attachmentId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_ATTACHMENT ), cardController.deleteAttachment );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/:cardId/attachment/update/:attachmentId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_ATTACHMENT ), AttachUploadSingleMiddleware, cardController.updateAttachment );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/get", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_TODO ), cardController.getAllTodos );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/get/:todoId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_TODO ), cardController.getTodoById );

cardRoute.post("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/add", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_TODO ), validateTodo, validateHandler, cardController.addTodo );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/update/:todoId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_TODO ), validateTodo, validateHandler, cardController.updateTodo );

cardRoute.delete("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/delete/:todoId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_TODO ), cardController.deleteTodo );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/:cardId/tl/:todoListId/todo/check/:todoId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.CHECK_TODO ), cardController.checkTodo );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/todoList/get", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_TODO_LIST ), cardController.getTodoList );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/todoList/get/:todoListId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_TODO_LIST ), cardController.getTodoListById );

cardRoute.post("/:workspaceId/b/:boardId/l/:listId/c/:cardId/todoList/add", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_TODO_LIST ), validateTodoList, validateHandler, cardController.addTodoList );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/:cardId/todoList/update/:todoListId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_TODO_LIST ), validateTodoList, validateHandler, cardController.updateTodoList );

cardRoute.delete("/:workspaceId/b/:boardId/l/:listId/c/:cardId/todoList/delete/:todoListId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_TODO_LIST ), cardController.deleteTodoList );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/comment/get", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_COMMENT ), cardController.getCommentsByCardId );

cardRoute.get("/:workspaceId/b/:boardId/l/:listId/c/:cardId/comment/get/:commentId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_COMMENT ), cardController.getCommentById );

cardRoute.post("/:workspaceId/b/:boardId/l/:listId/c/:cardId/comment/add", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_COMMENT ), validateComment, validateHandler, cardController.addComment );

cardRoute.put("/:workspaceId/b/:boardId/l/:listId/c/:cardId/comment/update/:commentId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_COMMENT ), validateComment, validateHandler, cardController.updateComment );

cardRoute.delete("/:workspaceId/b/:boardId/l/:listId/c/:cardId/comment/delete/:commentId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_COMMENT ), cardController.deleteComment );

export default cardRoute
