import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Permission } from '../orm/entities/permission.entity.ts';
import PermissionRepository from "../repositories/permission.repository.ts";
import { PermissionBody } from '../common/typings/custom.interface';

class PermissionService {

    async addPermission( permission : PermissionBody ) : Promise<Result> {
        try {
            const { permissionName } = permission;
            const isExistedPermission = await PermissionRepository.getPermissionByName( permissionName );
            if (isExistedPermission) {
                throw new conflictError("Permission already exist");
            }
            const newPermission = new Permission();
            newPermission.permissionName = permissionName;
            await PermissionRepository.addPermission( newPermission );
            return new Result( true, 200, "Permission added successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async getAllPermissions(): Promise<Result> {    
        try {
            const permissions = await PermissionRepository.getAllPermission();
            if (!permissions) {
                throw new notFoundError("Permissions not found");
            }
            return new Result( true, 200, "Get all permissions successful", permissions )
        } catch (error : unknown) {
            throw error;
        }
    }

    async getPermissionById( permissionId : number ) : Promise<Result> {
        try {
            const permission = await PermissionRepository.getPermissionById( permissionId );
            if (!permission) {
                throw new notFoundError("Permission not found");
            }
            return new Result( true, 200, "Get permission successful", permission );
        } catch (error : unknown) {
            throw error;
        }
    }

    async updatePermission( permissionId : number, permission : Partial<Permission> ) : Promise<Result> {
        try {
            const isExistedPermission = await PermissionRepository.getPermissionById( permissionId );
            if (!isExistedPermission) {
                throw new notFoundError("Permission not found");
            }
            await PermissionRepository.updatePermission( permissionId, permission );
            return new Result( true, 200, "Permission updated successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async deletePermission( permissionId : number ) : Promise<Result> {
        try {
            const isExistedPermission = await PermissionRepository.getPermissionById( permissionId );
            if (!isExistedPermission) {
                throw new notFoundError("Permission not found");
            }
            await PermissionRepository.deletePermission( permissionId );
            return new Result( true, 200, "Permission deleted successful");
        } catch (error : unknown) {
            throw error;
        }
    }
}

export default new PermissionService();
