import { Permission } from "../orm/entities/permission.entity";
import { mysqlSource } from "../configs/data-source.config";
import { In } from 'typeorm';

class PermissionRepository {
    private readonly permissionRepository = mysqlSource.getRepository(Permission);

    async findPermissionById( permissionId : number ) : Promise<Permission | null> {
        const permission = await this.permissionRepository.findOne({
            select : ["id", "permissionName"],
            where : {
                id : permissionId
            }
        });
        return permission
    }

    async findPermissionByName( name : string ) : Promise<Permission | null> {
        const permission = await this.permissionRepository.findOne({
            select : ["id", "permissionName"],
            where : {
                permissionName : name
            }
        });
        return permission;
    }

    async findAllPermission() : Promise<Permission[] | null> {
        const permissions = await this.permissionRepository.find({
            select : ["id", "permissionName"],
            order : {
                id : 'ASC'
            }
        });
        return permissions;
    }

    async findPermissionRelateWithRole( PermissionId : number ) : Promise<Permission | null> {
        const permissions = await this.permissionRepository.find({
            select : ["permissionName"],
            relations : ["roles"],
            where : {
                id : PermissionId
            }
        });
        return permissions[0];
    }

    async findAllPermissionsRelateWithRole( roleId : number[] ) : Promise<Permission[] | null> {
        const permissions = await this.permissionRepository.find({
            select : ["permissionName"],
            relations : ["roles"],
            where : {
                roles : {
                    id : In(roleId)
                }
            }
        });
        return permissions;
    }

    async addPermission( permission : Permission ) : Promise<Permission | null> {
        const newPermission = this.permissionRepository.create( permission );
        await this.permissionRepository.save(newPermission);
        return newPermission;
    }

    async updatePermission( permissionId : number, permission : Partial<Permission> ) : Promise<void> {
        await this.permissionRepository.update( permissionId, permission );
    }

    async deletePermission( permissionId : number ) : Promise<void> {
        await this.permissionRepository.delete( permissionId );
    }
}

export default new PermissionRepository();
