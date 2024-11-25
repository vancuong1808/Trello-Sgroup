import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRole } from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../common/enums/permissions';

const roleRoute = express.Router();

roleRoute.post("/add", authenticate, RequiredPermissions( Permissions.ADD_ROLE ), validateRole, validateHandler, roleController.addRole );

roleRoute.get("/get/:roleId", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getRoleById );

roleRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getAllRoles );

roleRoute.put("/update/:roleId", authenticate, RequiredPermissions( Permissions.UPDATE_ROLE ), validateRole, validateHandler, roleController.updateRole );

roleRoute.delete("/delete/:roleId", authenticate, RequiredPermissions( Permissions.DELETE_ROLE ), roleController.deleteRole );

roleRoute.post("/assign/permission/:permissionId/role/:roleId", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), roleController.assignPermissionToRole );

roleRoute.delete("/remove/permission/:permissionId/role/:roleId", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), roleController.removePermissionFromRole );


export default roleRoute
