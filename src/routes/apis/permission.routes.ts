import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import permissionController from "../../controllers/permission.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validatePermissionName } from "../../validators/permission.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../common/enums/permissions';

const roleRoute = express.Router();

roleRoute.post("/add-permission/", authenticate, RequiredPermissions( Permissions.ADD_PERMISSION ), validatePermissionName, validateHandler, permissionController.addPermission );

roleRoute.get("/get-permission/", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getAllPermissions );

roleRoute.get("/get-permission/:id", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getPermissionById );

roleRoute.put("/update-permission/:id", authenticate, RequiredPermissions( Permissions.UPDATE_PERMISSION ), validatePermissionName, validateHandler, permissionController.updatePermission );

roleRoute.delete("/delete-permission/:id", authenticate, RequiredPermissions( Permissions.DELETE_PERMISSION ), permissionController.deletePermission );

export default roleRoute