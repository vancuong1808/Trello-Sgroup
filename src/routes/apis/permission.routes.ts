import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import permissionController from "../../controllers/permission.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import permissionValidator from "../../validators/permission.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../common/enums/permissions';

const roleRoute = express.Router();

roleRoute.post("/permission", authenticate, RequiredPermissions( Permissions.ADD_PERMISSION ), permissionValidator.validateAddPermission, validateHandler, permissionController.addPermission );

roleRoute.get("/permission", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getAllPermissions );

roleRoute.get("/permission/:permissionId", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getPermissionById );

roleRoute.put("/permission/:permissionId", authenticate, RequiredPermissions( Permissions.UPDATE_PERMISSION ), permissionValidator.validateUpdatePermission, validateHandler, permissionController.updatePermission );

roleRoute.delete("/permission/:permissionId", authenticate, RequiredPermissions( Permissions.DELETE_PERMISSION ), permissionController.deletePermission );

export default roleRoute
