import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateList } from "../../validators/list.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import { IsMemberOfBoard } from "../../middlewares/board.middleware.ts";
import { IsMemberOfWorkspace } from "../../middlewares/workspace.middleware.ts";
import listController from "../../controllers/list.controller";
const listRoute = express.Router();

listRoute.get("/:workspaceId/b/:boardId/l/get/", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_LIST ), listController.getAllLists );

listRoute.get("/:workspaceId/b/:boardId/l/get/:listId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.VIEW_LIST ), listController.getListById );

listRoute.post("/:workspaceId/b/:boardId/l/add", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_LIST ), validateList, validateHandler, listController.addList );

listRoute.put("/:workspaceId/b/:boardId/l/update/:listId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.UPDATE_LIST ), validateList, validateHandler, listController.updateList );

listRoute.delete("/:workspaceId/b/:boardId/l/delete/:listId", authenticate, IsMemberOfWorkspace, IsMemberOfBoard, RequiredPermissions( Permissions.DELETE_LIST ), listController.deleteList );

export default listRoute
