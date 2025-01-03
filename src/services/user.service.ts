import { badRequestError, conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Result } from '../handlers/result.handler.ts';
import { User } from '../orm/entities/user.entity.ts';
import RoleRepository from '../repositories/role.repository.ts';
import UserRepository from '../repositories/user.repository.ts';
import RedisClient from '../utils/redis/redis.ts';

class UserService {
    async getAllUsers() : Promise<Result> {
        const users = await UserRepository.getAllUser();
        if (!users) {
            throw new notFoundError("Users not found");
        }
        return new Result( true, 200, "Get all users successful",  users );
    }

    async getUserById( userId : number ) : Promise<Result> {
        const user = await UserRepository.getUserById( userId );
        if (!user) {
            throw new notFoundError("User not found");
        }
        return new Result( true, 200, "Get user successful", user );
    }

    async deleteUser( userId : number ) : Promise<Result> {
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        await UserRepository.deleteUser( userId );
        return new Result( true, 200, "User deleted successful");
    }

    async updateUser( userId : number, user : Partial<User> ) : Promise<Result> {
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        await UserRepository.updateUser( userId, user );
        return new Result( true, 200, "User updated successful");
    }

    async assignRoleToUser( userId : number, roleId : number ) : Promise<Result> {
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
    }

    async removeRoleFromUser( userId : number, roleId : number ) : Promise<Result> {
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
        if ( !isExistedRoleFromUser.roles.some( (role) => role.id === roleId ) ) {
            throw new conflictError("User doesn't have this role");
        }
        await UserRepository.removeRoleFromUser( isExistedRoleFromUser, isExistedRole );
        const isExistedCachedRolesOfUser = await RedisClient.getString( `rolesOfUser:${ userId }` );
        if (isExistedCachedRolesOfUser) {
            await RedisClient.deleteString( `rolesOfUser:${ userId }` );
        }
        return new Result(true, 200, "Remove role from user successful");
    }
}

export default new UserService();
