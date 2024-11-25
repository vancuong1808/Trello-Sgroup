import express from "express"
import userController from "../../controllers/user.controller.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateUpdateUser } from "../../validators/user.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
const userRoute = express.Router();

userRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getAllUsers );

userRoute.get("/get/:userId", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getUserById );

userRoute.put("/update/:userId", authenticate, RequiredPermissions( Permissions.UPDATE_USER ), validateUpdateUser, validateHandler, userController.updateUser );

userRoute.delete("/delete/:userId", authenticate, RequiredPermissions( Permissions.DELETE_USER ), userController.deleteUser );

userRoute.post("/assign/role/:roleId/users/:userId", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), userController.assignRoleToUser );

userRoute.delete("/remove/role/:roleId/users/:userId", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), userController.removeRoleFromUser );

export default userRoute
