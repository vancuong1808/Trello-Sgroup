import { Result } from '../handlers/result.handler.ts';
import { conflictError, unauthorizedError, notFoundError } from "../handlers/errors/customError.ts";
import { Role } from "../orm/entities/role.entity"
import RoleRepository from "../repositories/role.repository"
import { RoleBody } from '../common/typings/custom.interface';

class RoleService {
    async addRole( role : RoleBody ) : Promise<Result> {
        try {
            const { roleName } = role;
            const isExistedRole = await RoleRepository.findRoleByName(roleName);
            if (!isExistedRole) {
                throw new conflictError("RoleName already existed");
            }
            const newRole = new Role();
            newRole.name = roleName;
            await RoleRepository.addRole( newRole );
            return new Result( true, 201, "Role added successful");
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

}

