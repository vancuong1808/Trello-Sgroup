import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import workspaceValidator from "../../validators/workspace.validator.ts"
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import workspaceController from "../../controllers/workspace.controller";
import { IsMemberOfWorkspace } from "../../middlewares/checkMember.middleware.ts";
const workspaceRoute = express.Router();

workspaceRoute.get("/workspace", authenticate, workspaceController.getAllWorkspaces );

workspaceRoute.get("/workspace/:workspaceId", authenticate, workspaceController.getWorkspaceById );

workspaceRoute.post("/workspace", authenticate, RequiredPermissions( Permissions.ADD_WORKSPACE ), workspaceValidator.validateAddWorkspace, validateHandler, workspaceController.addWorkspace );

workspaceRoute.put("/workspace/:workspaceId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.UPDATE_WORKSPACE ), workspaceValidator.validateUpdateWorkspace, validateHandler, workspaceController.updateWorkspace );

workspaceRoute.delete("/workspace/:workspaceId", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.DELETE_WORKSPACE ), workspaceController.deleteWorkspace );

workspaceRoute.post("/workspace/add/member", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.ADD_MEMBER_TO_WORKSPACE ), workspaceValidator.validateUserToWorkspace, validateHandler, workspaceController.addMemberToWorkspace );

workspaceRoute.delete("/workspace/remove/member", authenticate, IsMemberOfWorkspace, RequiredPermissions( Permissions.REMOVE_MEMBER_FROM_WORKSPACE ), workspaceValidator.validateUserToWorkspace, validateHandler, workspaceController.removeMemberFromWorkspace);

export default workspaceRoute
