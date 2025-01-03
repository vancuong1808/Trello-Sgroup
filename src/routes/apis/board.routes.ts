import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import BoardValidator from "../../validators/board.validator.ts"
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import { IsMemberOfWorkspace, IsMemberOfBoard } from "../../middlewares/checkMember.middleware.ts";
import boardController from "../../controllers/board.controller";
const boardRoute = express.Router();

boardRoute.get("/board", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getAllBoards );

boardRoute.get("/board/:boardId", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getBoardById );

boardRoute.post("/board", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.ADD_BOARD ), BoardValidator.validateAddBoard, validateHandler, boardController.addBoard );

boardRoute.put("/board/:boardId", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_BOARD ), BoardValidator.validateUpdateBoard, validateHandler, boardController.updateBoard );

boardRoute.delete("/board/:boardId", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_BOARD ), boardController.deleteBoard );

boardRoute.post("/board/add/member", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_MEMBER_TO_BOARD ), BoardValidator.validateUserToBoard, validateHandler, boardController.addMemberToBoard );

boardRoute.delete("/board/remove/member", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.REMOVE_MEMBER_FROM_BOARD ), BoardValidator.validateUserToBoard, validateHandler, boardController.removeMemberFromBoard );

export default boardRoute
