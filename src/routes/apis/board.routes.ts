import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateBoard } from "../../validators/board.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import { IsMemberOfBoard } from "../../middlewares/board.middleware.ts";
import { IsMemberOfWorkspace } from "../../middlewares/workspace.middleware.ts";
import boardController from "../../controllers/board.controller";
const boardRoute = express.Router();

boardRoute.get("/:workspaceId/b/get", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getAllBoards );

boardRoute.get("/:workspaceId/b/get/:boardId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getBoardById );

boardRoute.post("/:workspaceId/b/add", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.ADD_BOARD ), validateBoard, validateHandler, boardController.addBoard );

boardRoute.put("/:workspaceId/b/update/:boardId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_BOARD ), validateBoard, validateHandler, boardController.updateBoard );

boardRoute.delete("/:workspaceId/b/delete/:boardId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_BOARD ), boardController.deleteBoard );

boardRoute.post("/:workspaceId/b/add/:boardId/members/:userId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_MEMBER_TO_BOARD ), boardController.addMemberToBoard );

boardRoute.delete("/:workspaceId/b/remove/:boardId/members/:userId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.REMOVE_MEMBER_FROM_BOARD ), boardController.removeMemberFromBoard );

export default boardRoute
