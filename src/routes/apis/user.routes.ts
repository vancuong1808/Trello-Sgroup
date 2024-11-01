import express from "express"
import userController from "../../controllers/user.controller.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateUser, validateRemoveUserRole, validateAssignUserRole  } from "../../validators/user.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
const userRoute = express.Router();

userRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getAllUsers );

userRoute.get("/get/:id", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getUserById );

userRoute.put("/update/:id", authenticate, RequiredPermissions( Permissions.UPDATE_USER ), validateUser, validateHandler, userController.updateUser );

userRoute.delete("/delete/:id", authenticate, RequiredPermissions( Permissions.DELETE_USER ), userController.deleteUser );

userRoute.post("/assign-role-to-user", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), validateAssignUserRole, validateHandler, userController.assignRoleToUser );

userRoute.delete("/remove-role-from-user/:id", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), validateRemoveUserRole, validateHandler, userController.removeRoleFromUser );

export default userRoute