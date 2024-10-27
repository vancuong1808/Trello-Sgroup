import { Result } from '../handlers/result.handler.ts';
import { RoleBody } from '../common/typings/custom.interface';
import { conflictError, unauthorizedError, notFoundError } from "../handlers/errors/customError.ts";
import { Role } from "../orm/entities/role.entity"
import RoleRepository from "../repositories/role.repository"
import PermissionRepository from '../repositories/permission.repository.ts';

class RoleService {
    async addRole( role : RoleBody ) : Promise<Result> {
        try {
            const { roleName } = role;
            const isExistedRole = await RoleRepository.findRoleByName(roleName);
            if (isExistedRole) {
                throw new conflictError("RoleName already existed");
            }
            const newRole = new Role();
            newRole.roleName = roleName;
            await RoleRepository.addRole( newRole );
            return new Result( true, 201, "Role added successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async getAllRoles() : Promise<Result> {
        try {
            const roles = await RoleRepository.findAllRole();
            if (!roles) {
                throw new notFoundError("Roles not found");
            }
            return new Result( true, 200, "Get all roles successful", { roles } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async getRoleById( roleId : number ) : Promise<Result> {
        try {
            const role = await RoleRepository.findRoleById( roleId );
            if (!role) {
                throw new notFoundError("Role not found");
            }
            return new Result( true, 200, "Get role successful", { role } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async updateRole( roleId : number, role : Partial<Role> ) : Promise<Result> {
        try {
            const isExistedRole = await RoleRepository.findRoleById(roleId);
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            await RoleRepository.updateRole(roleId, role);
            return new Result( true, 200, "Role updated successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async deleteRole( roleId : number ) : Promise<Result> {
        try {
            const isExistedRole = await RoleRepository.findRoleById( roleId );
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            await RoleRepository.deleteRole( roleId );
            return new Result( true, 200, "Role deleted successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async assignRoleToPermission( roleId : number, permissionId : number ) : Promise<Result> {
        try {
            const isExistedRole = await RoleRepository.findRoleById( roleId );
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            const isExistedPermission = await PermissionRepository.findPermissionById( permissionId );
            if (!isExistedPermission) {
                throw new notFoundError("Permission not found");
            }
            if ( !isExistedRole?.permissions ) {
                isExistedRole.permissions = [];
            }
            await RoleRepository.assignPermissionToRole( isExistedRole, isExistedPermission );
            return new Result( true, 200, "Assign role to permission successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async removeRoleFromPermission( roleId : number, permissionId : number ) : Promise<Result> {
        try {
            const isExistedRole = await RoleRepository.findRoleById( roleId );
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            const isExistedPermission = await PermissionRepository.findPermissionById( permissionId );
            if (!isExistedPermission) {
                throw new notFoundError("Permission not found");
            }
            const isExistedRolePermission = await RoleRepository.findRoleRelateWithPermission( roleId );
            if (!isExistedRolePermission || isExistedRolePermission?.permissions.length == 0) {
                throw new notFoundError("Role has this permission not found");
            }
            await RoleRepository.removePermissionFromRole( isExistedRolePermission, isExistedPermission );
            return new Result( true, 200, "Remove role from permission successful");
        } catch (error : unknown) {
            throw error;
        }
    }

}

export default new RoleService();