import { Permission } from "../orm/entities/permission.entity";
import { mysqlSource } from "../configs/data-source.config";

class PermissionRepository {
    private readonly permissionRepository = mysqlSource.getRepository(Permission);

    async findPermissionById( permissionId : number ) : Promise<Permission | null> {
        const permission = await this.permissionRepository.findOne({
            select : ["id", "name"],
            where : {
                id : permissionId
            }
        });
        return permission
    }

    async findPermissionByName( name : string ) : Promise<Permission | null> {
        const permission = await this.permissionRepository.findOne({
            select : ["id", "name"],
            where : {
                name : name
            }
        });
        return permission;
    }

    async findAllPermission() : Promise<Permission | null> {
        const permissions = await this.permissionRepository.find({
            select : ["id", "name"]
        });
        return permissions[0];
    }

    async findPermissionRelateWithRole() : Promise<Permission | null> {
        const permissions = await this.permissionRepository.find({
            select : ["id"],
            relations : ["role"]
        });
        return permissions[0];
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