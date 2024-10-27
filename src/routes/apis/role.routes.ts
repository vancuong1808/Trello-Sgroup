import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRoleName, validateAssignRolePermission, validateRemoveRolePermission, } from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../common/enums/permissions';

const roleRoute = express.Router();

roleRoute.post("/add-role", authenticate, RequiredPermissions( Permissions.ADD_ROLE ), validateRoleName, validateHandler, roleController.addRole );

roleRoute.get("/get-role/:id", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getRoleById );

roleRoute.get("/get-role/", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getAllRoles );

roleRoute.put("/update-role/:id", authenticate, RequiredPermissions( Permissions.UPDATE_ROLE ), validateRoleName, validateHandler, roleController.updateRole );

roleRoute.delete("/delete-role/:id", authenticate, RequiredPermissions( Permissions.DELETE_ROLE ), roleController.deleteRole );

roleRoute.post("/assign-permission-to-role", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), validateAssignRolePermission, validateHandler, roleController.assignPermissionToRole );

roleRoute.delete("/remove-permission-from-role/:id", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), validateRemoveRolePermission, validateHandler, roleController.removePermissionFromRole );


export default roleRoute