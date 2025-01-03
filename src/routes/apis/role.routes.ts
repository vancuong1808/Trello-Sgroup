import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import RoleValidator from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../common/enums/permissions';

const roleRoute = express.Router();

roleRoute.post("/role", authenticate, RequiredPermissions( Permissions.ADD_ROLE ), RoleValidator.validateAddRole, validateHandler, roleController.addRole );

roleRoute.get("/role/:roleId", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getRoleById );

roleRoute.get("/role", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getAllRoles );

roleRoute.put("/role/:roleId", authenticate, RequiredPermissions( Permissions.UPDATE_ROLE ), RoleValidator.validateUpdateRole, validateHandler, roleController.updateRole );

roleRoute.delete("/role/:roleId", authenticate, RequiredPermissions( Permissions.DELETE_ROLE ), roleController.deleteRole );

roleRoute.post("/role/assign/permission", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), RoleValidator.validatePermissionOfRole, validateHandler, roleController.assignPermissionToRole );

roleRoute.delete("/role/remove/permission", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), RoleValidator.validatePermissionOfRole, validateHandler, roleController.removePermissionFromRole );


export default roleRoute
