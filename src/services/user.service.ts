import { Result } from '../handlers/result.handler.ts';
import { conflictError, badRequestError, notFoundError } from "../handlers/errors/customError.ts";
import { User } from '../orm/entities/user.entity.ts';
import UserRepository from '../repositories/user.repository.ts';
import RoleRepository from '../repositories/role.repository.ts';
import RedisClient from '../common/redis/redis.ts';

class UserService {
    async getAllUsers() : Promise<Result> {
        try {
            const users = await UserRepository.getAllUser();
            if (!users) {
                throw new notFoundError("Users not found");
            }
            return new Result( true, 200, "Get all users successful",  users );
        } catch (error : unknown) {
            throw error;
        }
    }

    async getUserById( userId : number ) : Promise<Result> {
        try {
            const user = await UserRepository.getUserById( userId );
            if (!user) {
                throw new notFoundError("User not found");
            }
            return new Result( true, 200, "Get user successful", user );
        } catch (error : unknown) {
            throw error;
        }
    }

    async deleteUser( userId : number ) : Promise<Result> {
        try {
            const isExistedUser = await UserRepository.getUserById( userId );
            if (!isExistedUser) {
                throw new notFoundError("User not found");
            }
            await UserRepository.deleteUser( userId );
            return new Result( true, 200, "User deleted successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async updateUser( userId : number, user : Partial<User> ) : Promise<Result> {
        try {
            const isExistedUser = await UserRepository.getUserById( userId );
            if (!isExistedUser) {
                throw new notFoundError("User not found");
            }
            await UserRepository.updateUser( userId, user );
            return new Result( true, 200, "User updated successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async assignRoleToUser( userId : number, roleId : number ) : Promise<Result> {
        try {
            const isExistedUser = await UserRepository.getUserById( userId );
            if (!isExistedUser) {
                throw new notFoundError("User not found");
            }
            const isExistedRole = await RoleRepository.getRoleById( roleId );
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            const isExistedRoleFromUser = await UserRepository.getUserRelateWithRole( userId );
            if (!isExistedRoleFromUser) {
                throw new badRequestError("Find User relate with role fail");
            }
            if ( isExistedRoleFromUser.roles.some( (role) => role.id === roleId ) ) {
                throw new conflictError("User already has this role");
            }
            await UserRepository.assignRoleToUser( isExistedRoleFromUser, isExistedRole );
            const isExistedCachedRolesOfUser = await RedisClient.getString( `rolesOfUser:${ userId }` );
            if (isExistedCachedRolesOfUser) {
                await RedisClient.deleteString( `rolesOfUser:${ userId }` );
            }
            return new Result( true, 200, "Assign role to user successful");
        } catch (error : unknown) {
            throw error;
        }
    }

    async removeRoleFromUser( userId : number, roleId : number ) : Promise<Result> {
        try {
            const isExistedUser = await UserRepository.getUserById( userId );
            if (!isExistedUser) {
                throw new notFoundError("User not found");
            }
            const isExistedRole = await RoleRepository.getRoleById( roleId );
            if (!isExistedRole) {
                throw new notFoundError("Role not found");
            }
            const isExistedRoleFromUser = await UserRepository.getUserRelateWithRole( userId );
            if (!isExistedRoleFromUser) {
                throw new badRequestError("Find User relate with role fail");
            }
            if ( isExistedRoleFromUser.roles.length == 0 ) {
                throw new notFoundError("User has this role not found");
            }
            await UserRepository.removeRoleFromUser( isExistedRoleFromUser, isExistedRole );
            const isExistedCachedRolesOfUser = await RedisClient.getString( `rolesOfUser:${ userId }` );
            if (isExistedCachedRolesOfUser) {
                await RedisClient.deleteString( `rolesOfUser:${ userId }` );
            }
            return new Result( true, 200, "Remove role from user successful");
        } catch (error : unknown) {
            throw error;
        }
    }
}

export default new UserService();
