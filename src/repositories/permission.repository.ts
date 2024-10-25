import { Permission } from "../orm/entities/permission.entity";
import { mysqlSource } from "../configs/data-source.config";
import { badRequestError } from "../handlers/errors/customError";

class PermissionRepository {
    private readonly permissionRepository = mysqlSource.getRepository(Permission);

    async findPermissionById( permissionId : number ) : Promise<Permission | null> {
        try {
            const permission = await this.permissionRepository.findOne({
                select : ["id", "name"],
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
                select : ["id", "name"],
                where : {
                    name : name
                }
            });
            return permission;
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findAllPermission() : Promise<Permission | null> {
        try {
            const permissions = await this.permissionRepository.find({
                select : ["id", "name"]
            });
            return permissions[0];
        } catch (error : unknown) {
            throw new badRequestError(`PermissionReposity has error : ${ error }`);
        }
    }

    async findPermissionRelateWithRole() : Promise<Permission | null> {
        try {
            const permissions = await this.permissionRepository.find({
                select : ["id"],
                relations : ["role"]
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