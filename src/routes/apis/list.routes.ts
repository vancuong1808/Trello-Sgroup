import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import { IsMemberOfBoard, CheckMemberInList } from "../../middlewares/checkMember.middleware.ts";
import listController from "../../controllers/list.controller";
import listValidator from "../../validators/list.validator.ts";
const listRoute = express.Router();

listRoute.get("/list", authenticate, listController.getAllLists );

listRoute.get("/list/:listId", authenticate, listController.getListById );

listRoute.post("/list", authenticate, IsMemberOfBoard, RequiredPermissions( Permissions.ADD_LIST ), listValidator.validateAddList, validateHandler, listController.addList );

listRoute.put("/list/:listId", authenticate, CheckMemberInList, RequiredPermissions( Permissions.UPDATE_LIST ), listValidator.validateUpdateList, validateHandler, listController.updateList );

listRoute.delete("/list/:listId", authenticate, CheckMemberInList, RequiredPermissions( Permissions.DELETE_LIST ), listController.deleteList );

export default listRoute
