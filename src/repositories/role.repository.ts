import { Role } from "../orm/entities/role.entity";
import { Permission } from "../orm/entities/permission.entity"; 
import { badRequestError } from "../handlers/errors/customError";
import { mysqlSource } from "../configs/data-source.config";

class RoleRepository {
    private readonly roleRepository = mysqlSource.getRepository(Role);

    async getRoleById( roleId : number ) : Promise<Role | null> {
        const role = await this.roleRepository.findOne({
            select : ["id", "roleName"],
            where : {
                id : roleId
            }
        });
        return role
    }

    async getRoleByName( name : string ) : Promise<Role | null> {
        const role = await this.roleRepository.findOne({
            select : ["id", "roleName"],
            where : {
                roleName : name
            }
        });
        return role;
    }

    async getAllRole() : Promise<Role[] | null> {
        const roles = await this.roleRepository.find({
            select : ["id", "roleName"],
            order : {
                id : 'ASC'
            },
            relations : ["permissions"]
        });
        return roles;
    }

    async getRoleRelateWithPermission( roleId : number ) : Promise<Role | null> {
        const roles = await this.roleRepository.find({
            relations : ["permissions"],
            where : {
                id : roleId
            }
        });
        return roles[0];
    }

    async getRoleRelateWithUser( roleId : number ) : Promise<Role | null> {
        const roles = await this.roleRepository.find({
            select : ["id"],
            relations : ["users"],
            where : {
                id : roleId
            }
        });
        return roles[0];
    }

    async addRole( role : Role ) : Promise<Role | null> {
        const newRole = this.roleRepository.create( role );
        await this.roleRepository.save(newRole);
        return newRole;
    }

    async updateRole( roleId : number, role : Partial<Role> ) : Promise<void> {
        await this.roleRepository.update( roleId, role );
    }

    async deleteRole( roleId : number ) : Promise<void> {
        await this.roleRepository.delete( roleId );
    }

    async assignPermissionToRole( role : Role, permission : Permission ) : Promise<void> {
        role.permissions.push( permission );
        await this.roleRepository.save( role );
    }

    async removePermissionFromRole( role : Role, permission : Permission ) : Promise<void> {
        role.permissions = role.permissions.filter((element) => element.id !== permission.id);
        await this.roleRepository.save( role );
    }
}

export default new RoleRepository();
