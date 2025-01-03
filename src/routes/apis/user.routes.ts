import express from "express"
import userController from "../../controllers/user.controller.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
import UserValidator from "../../validators/user.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
const userRoute = express.Router();

userRoute.get("/user", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getAllUsers );

userRoute.get("/user/:userId", authenticate, RequiredPermissions( Permissions.VIEW_USER ), userController.getUserById );

userRoute.put("/user/:userId", authenticate, RequiredPermissions( Permissions.UPDATE_USER ), UserValidator.validateUpdateUser, validateHandler, userController.updateUser );

userRoute.delete("/user/:userId", authenticate, RequiredPermissions( Permissions.DELETE_USER ), userController.deleteUser );

userRoute.post("/user/assign/role", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), UserValidator.validateRoleOfUser, validateHandler, userController.assignRoleToUser );

userRoute.delete("/user/remove/role", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), UserValidator.validateRoleOfUser, validateHandler, userController.removeRoleFromUser );

export default userRoute
