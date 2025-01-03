import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import ListValidator from "../../validators/list.validator.ts"
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import { IsMemberOfBoard, CheckMemberInList } from "../../middlewares/checkMember.middleware.ts";
import listController from "../../controllers/list.controller";
const listRoute = express.Router();

listRoute.get("/list", authenticate, RequiredPermissions( Permissions.VIEW_LIST ), listController.getAllLists );

listRoute.get("/list/:listId", authenticate, CheckMemberInList,  RequiredPermissions( Permissions.VIEW_LIST ), listController.getListById );

listRoute.post("/list", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_LIST ), ListValidator.validateAddList, validateHandler, listController.addList );

listRoute.put("/list/:listId", authenticate, RequiredPermissions( Permissions.UPDATE_LIST ), ListValidator.validateUpdateList, validateHandler, listController.updateList );

listRoute.delete("/list/:listId", authenticate, RequiredPermissions( Permissions.DELETE_LIST ), listController.deleteList );

export default listRoute
