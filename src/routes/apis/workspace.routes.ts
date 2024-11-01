import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateWorkspaceName } from "../../validators/workspace.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import workspaceController from "../../controllers/workspace.controller";
const userRoute = express.Router();

userRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_WORKSPACE ), workspaceController.getAllWorkspaces );

userRoute.get("/get/:id", authenticate, RequiredPermissions( Permissions.VIEW_WORKSPACE ), workspaceController.getWorkspaceById );

userRoute.put("/update/:id", authenticate, RequiredPermissions( Permissions.UPDATE_WORKSPACE ), validateWorkspaceName, validateHandler, workspaceController.updateWorkspace );

userRoute.delete("/delete/:id", authenticate, RequiredPermissions( Permissions.DELETE_WORKSPACE ), workspaceController.deleteWorkspace );

export default userRoute