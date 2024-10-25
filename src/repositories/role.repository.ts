import { Role } from "../orm/entities/role.entity";
import { badRequestError } from "../handlers/errors/customError";
import { mysqlSource } from "../configs/data-source.config";

class RoleRepository {
    private readonly roleRepository = mysqlSource.getRepository(Role);

    async findRoleById( roleId : number ) : Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                select : ["id", "name"],
                where : {
                    id : roleId
                }
            });
            return role
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findRoleByName( name : string ) : Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                select : ["id", "name"],
                where : {
                    name : name
                }
            });
            return role;
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findAllRole() : Promise<Role | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id", "name"]
            });
            return roles[0];
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findRoleRelateWithPermission() : Promise<Role | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id"],
                relations : ["permission"]
            });
            return roles[0];
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findRoleRelateWithUser() : Promise<Role | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id"],
                relations : ["user"]
            });
            return roles[0];
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async addRole( role : Role ) : Promise<Role | null> {
        try {
            const newRole = this.roleRepository.create( role );
            await this.roleRepository.save(newRole);
            return newRole;
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async updateRole( roleId : number, role : Partial<Role> ) : Promise<void> {
        try {
            await this.roleRepository.update( roleId, role );
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async deleteRole( roleId : number ) : Promise<void> {
        try {
            await this.roleRepository.delete( roleId );
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    
}

export default new RoleRepository();