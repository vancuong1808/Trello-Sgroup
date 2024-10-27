import { Permission } from "../orm/entities/permission.entity";
import { mysqlSource } from "../configs/data-source.config";
import { badRequestError } from "../handlers/errors/customError";
import { In } from 'typeorm';

class PermissionRepository {
    private readonly permissionRepository = mysqlSource.getRepository(Permission);

    async findPermissionById( permissionId : number ) : Promise<Permission | null> {
        try {
            const permission = await this.permissionRepository.findOne({
                select : ["id", "permissionName"],
                where : {
                    id : permissionId
                }
            });
            return permission
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findPermissionByName( name : string ) : Promise<Permission | null> {
        try {
            const permission = await this.permissionRepository.findOne({
                select : ["id", "permissionName"],
                where : {
                    permissionName : name
                }
            });
            return permission;
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findAllPermission() : Promise<Permission[] | null> {
        try {
            const permissions = await this.permissionRepository.find({
                select : ["id", "permissionName"],
                order : {
                    id : 'ASC'
                }
            });
            return permissions;
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findPermissionRelateWithRole( PermissionId : number ) : Promise<Permission | null> {
        try {
            const permissions = await this.permissionRepository.find({
                select : ["permissionName"],
                relations : ["role"],
                where : {
                    id : PermissionId
                }
            });
            return permissions[0];
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findAllPermissionsRelateWithRole( roleId : number[] ) : Promise<Permission | null> {
        try {
            const permissions = await this.permissionRepository.find({
                select : ["id"],
                relations : ["role"],
                where : {
                    roles : {
                        id : In(roleId)
                    }
                }
            });
            return permissions[0];
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async addPermission( permission : Permission ) : Promise<Permission | null> {
        try {
            const newPermission = this.permissionRepository.create( permission );
            await this.permissionRepository.save(newPermission);
            return newPermission;
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async updatePermission( permissionId : number, permission : Partial<Permission> ) : Promise<void> {
        try {
            await this.permissionRepository.update( permissionId, permission );
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async deletePermission( permissionId : number ) : Promise<void> {
        try {
            await this.permissionRepository.delete( permissionId );
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }
}

export default new PermissionRepository();