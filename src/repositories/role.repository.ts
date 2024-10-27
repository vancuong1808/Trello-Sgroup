import { Role } from "../orm/entities/role.entity";
import { Permission } from "../orm/entities/permission.entity"; 
import { badRequestError } from "../handlers/errors/customError";
import { mysqlSource } from "../configs/data-source.config";

class RoleRepository {
    private readonly roleRepository = mysqlSource.getRepository(Role);

    async findRoleById( roleId : number ) : Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                select : ["id", "roleName"],
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
                select : ["id", "roleName"],
                where : {
                    roleName : name
                }
            });
            return role;
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findAllRole() : Promise<Role[] | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id", "roleName"],
                order : {
                    id : 'ASC'
                }
            });
            return roles;
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findRoleRelateWithPermission( roleId : number ) : Promise<Role | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id"],
                relations : ["permissions"],
                where : {
                    id : roleId
                }
            });
            return roles[0];
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async findRoleRelateWithUser( roleId : number ) : Promise<Role | null> {
        try {
            const roles = await this.roleRepository.find({
                select : ["id"],
                relations : ["users"],
                where : {
                    id : roleId
                }
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

    async assignPermissionToRole( role : Role, permission : Permission ) : Promise<void> {
        try {
            role.permissions.push( permission );
            await this.roleRepository.save( role );
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }

    async removePermissionFromRole( role : Role, permission : Permission ) : Promise<void> {
        try {
            role.permissions = role.permissions.filter((element) => element.id !== permission.id);
            await this.roleRepository.save( role );
        } catch (error : unknown) {
            throw new badRequestError(`RoleReposity has error : ${ error }`);
        }
    }
}

export default new RoleRepository();