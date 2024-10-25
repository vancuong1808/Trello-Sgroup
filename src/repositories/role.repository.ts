import { Role } from "../orm/entities/role.entity";
import { Permission } from "../orm/entities/permission.entity";
import { mysqlSource } from "../configs/data-source.config";

class RoleRepository {
    private readonly roleRepository = mysqlSource.getRepository(Role);

    async findRoleById( roleId : number ) : Promise<Role | null> {
        const role = await this.roleRepository.findOne({
            select : ["id", "name"],
            where : {
                id : roleId
            }
        });
        return role
    }

    async findRoleByName( name : string ) : Promise<Role | null> {
        const role = await this.roleRepository.findOne({
            select : ["id", "name"],
            where : {
                name : name
            }
        });
        return role;
    }

    async findAllRole() : Promise<Role | null> {
        const roles = await this.roleRepository.find({
            select : ["id", "name"]
        });
        return roles[0];
    }

    async findRoleRelateWithPermission() : Promise<Role | null> {
        const roles = await this.roleRepository.find({
            select : ["id"],
            relations : ["permission"]
        });
        return roles[0];
    }

    async findRoleRelateWithUser() : Promise<Role | null> {
        const roles = await this.roleRepository.find({
            select : ["id"],
            relations : ["user"]
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

    
}

export default new RoleRepository();