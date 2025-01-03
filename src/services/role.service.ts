import { Result } from '../handlers/result.handler.ts';
import { RoleBody } from '../common/typings/custom.interface';
import { conflictError, notFoundError, badRequestError } from "../handlers/errors/customError.ts";
import { Role } from "../orm/entities/role.entity"
import RoleRepository from "../repositories/role.repository"
import PermissionRepository from '../repositories/permission.repository.ts';

class RoleService {
    async addRole( role : RoleBody ) : Promise<Result> {
        const { roleName } = role;
        const isExistedRole = await RoleRepository.getRoleByName(roleName);
        if (isExistedRole) {
            throw new conflictError("RoleName already existed");
        }
        const newRole = new Role();
        newRole.roleName = roleName;
        await RoleRepository.addRole( newRole );
        return new Result( true, 201, "Role added successful");
    }

    async getAllRoles() : Promise<Result> {
        const roles = await RoleRepository.getAllRole();
        if (!roles) {
            throw new notFoundError("Roles not found");
        }
        return new Result( true, 200, "Get all roles successful", roles );
    }

    async getRoleById( roleId : number ) : Promise<Result> {
        const role = await RoleRepository.getRoleById( roleId );
        if (!role) {
            throw new notFoundError("Role not found");
        }
        return new Result( true, 200, "Get role successful", role );
    }

    async updateRole( roleId : number, role : Partial<Role> ) : Promise<Result> {
        const isExistedRole = await RoleRepository.getRoleById(roleId);
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        await RoleRepository.updateRole(roleId, role);
        return new Result( true, 200, "Role updated successful");
    }

    async deleteRole( roleId : number ) : Promise<Result> {
        const isExistedRole = await RoleRepository.getRoleById( roleId );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        await RoleRepository.deleteRole( roleId );
        return new Result( true, 200, "Role deleted successful");
    }

    async assignPermissionToRole( roleId : number, permissionId : number ) : Promise<Result> {
        const isExistedRole = await RoleRepository.getRoleById( roleId );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const isExistedPermission = await PermissionRepository.getPermissionById( permissionId );
        if (!isExistedPermission) {
            throw new notFoundError("Permission not found");
        }
        const isExistPermissionFromRole = await RoleRepository.getRoleRelateWithPermission( roleId );
        if (!isExistPermissionFromRole) {
            throw new badRequestError("Find Role relate with permission fail");
        }
        if ( isExistPermissionFromRole.permissions.some( (permission) => permission.id === permissionId ) ) {
            throw new conflictError("Role already has this permission");
        }
        await RoleRepository.assignPermissionToRole( isExistPermissionFromRole, isExistedPermission );
        return new Result( true, 200, "Assign role to permission successful");
    }

    async removePermissionFromRole( roleId : number, permissionId : number ) : Promise<Result> {
        const isExistedRole = await RoleRepository.getRoleById( roleId );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const isExistedPermission = await PermissionRepository.getPermissionById( permissionId );
        if (!isExistedPermission) {
            throw new notFoundError("Permission not found");
        }
        const isExistedRoleFromPermission = await RoleRepository.getRoleRelateWithPermission( roleId );
        if (!isExistedRoleFromPermission) {
            throw new badRequestError("Find Role relate with permission fail");
        }
        if ( !isExistedRoleFromPermission.permissions.some( (permission) => permission.id === permissionId ) ) {
            throw new conflictError("Role not has this permission");
        }
        await RoleRepository.removePermissionFromRole( isExistedRoleFromPermission, isExistedPermission );
        return new Result( true, 200, "Remove role from permission successful");
    }
}

export default new RoleService();
