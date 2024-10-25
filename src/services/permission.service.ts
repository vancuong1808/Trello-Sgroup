import { Result } from '../handlers/result.handler.ts';
import { conflictError, unauthorizedError, notFoundError } from "../handlers/errors/customError.ts";
import { Permission } from '../orm/entities/permission.entity.ts';
import PermissionRepository from "../repositories/permission.repository.ts";
import { PermissionBody } from '../common/typings/custom.interface';

class PermissionService {
    async addPermission( permission : PermissionBody ) : Promise<Result> {
        try {
            const { permissionName } = permission;
            const isExistedPermission = PermissionRepository.findPermissionByName( permissionName );
            if (!isExistedPermission) {
                throw new conflictError("Permission already exist");
            }
            const newPermission = new Permission();
            newPermission.name = permissionName;
            await PermissionRepository.addPermission( newPermission );
            return new Result( true, 200, "Permission added successful", newPermission );
        } catch (error : unknown) {
            throw error;
        }
    }

    async updatePermission( permissionId : number, permission : Partial<Permission> ) : Promise<Result> {
        try {
            const isExistedPermission = await PermissionRepository.findPermissionById( permissionId );
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
            const isExistedPermission = await PermissionRepository.findPermissionById( permissionId );
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