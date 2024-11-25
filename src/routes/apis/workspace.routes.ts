import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateWorkspace } from "../../validators/workspace.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import workspaceController from "../../controllers/workspace.controller";
import { IsMemberOfWorkspace } from "../../middlewares/workspace.middleware.ts";
const workspaceRoute = express.Router();

workspaceRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_WORKSPACE ), workspaceController.getAllWorkspaces );

workspaceRoute.get("/get/:workspaceId", authenticate, RequiredPermissions( Permissions.VIEW_WORKSPACE ), workspaceController.getWorkspaceById );

workspaceRoute.post("/add", authenticate, RequiredPermissions( Permissions.ADD_WORKSPACE ), validateWorkspace, validateHandler, workspaceController.addWorkspace );

workspaceRoute.put("/update/:workspaceId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.UPDATE_WORKSPACE ), validateWorkspace, validateHandler, workspaceController.updateWorkspace );

workspaceRoute.delete("/delete/:workspaceId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.DELETE_WORKSPACE ), workspaceController.deleteWorkspace );

workspaceRoute.post("/add/:workspaceId/members/:userId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.ADD_MEMBER_TO_WORKSPACE ), workspaceController.addMemberToWorkspace );

workspaceRoute.delete("/remove/:workspaceId/members/:userId", authenticate,IsMemberOfWorkspace, RequiredPermissions( Permissions.REMOVE_MEMBER_FROM_WORKSPACE ), workspaceController.removeMemberFromWorkspace);

export default workspaceRoute
