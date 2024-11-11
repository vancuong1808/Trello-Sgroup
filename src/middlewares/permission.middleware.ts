import { Response, NextFunction } from "express";
import { badRequestError, forbiddenError, unauthorizedError } from "../handlers/errors/customError";
import { CustomRequest } from "../common/typings/custom.interface.d";
import { JwtPayload } from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import PermissionRepository from "../repositories/permission.repository";
import { Role } from "../orm/entities/role.entity";
import RedisClient from "../common/redis/redis";

export const RequiredPermissions : (
    requiredPermission : string
) => ( req : CustomRequest, res : Response, next : NextFunction ) => Promise<void> = ( 
    requiredPermission : string
) => { 
    return async( req : CustomRequest, res : Response, next : NextFunction ) => {
        try {
            if ( !req.user ) {
                next( new unauthorizedError("you must authenticate before") );
            }
            const userId: string | JwtPayload = typeof req.user === "string" ? req.user : req.user?.userId;
            if ( !userId ) {
                next( new unauthorizedError("you must authenticate before") );
            }
            const cachedPermission : string | null = await RedisClient.getString( `permissionOfUserId:${ userId }` );
            if ( cachedPermission ) {
                const permissions = JSON.parse( cachedPermission );
                if ( !permissions.some( ( permission : any ) => permission.permissionName === requiredPermission ) ) {
                    next( new forbiddenError("you don't have permission to access this route") );
                }
                return next();
            }
            const user = await UserRepository.findUserById( Number(userId) );
            if ( !user ) {
                next( new unauthorizedError("not found user") );
            }
            const isExistRoleFromUser = await UserRepository.findUserRelateWithRole( Number(userId) );
            if ( !isExistRoleFromUser ) {
                next( new unauthorizedError("Find user relate with role fail") );
            }
            const rolesFromUser : number[] = isExistRoleFromUser!.roles.map(( role : Role ) => role.id);
            const isExistPermissionFromRole = await PermissionRepository.findAllPermissionsRelateWithRole( rolesFromUser );
            if ( !isExistPermissionFromRole ) {
                next( new unauthorizedError("Find all permissions relate with role fail") );
            }
            await RedisClient.setString( `permissionOfUserId:${ userId }`, JSON.stringify( isExistPermissionFromRole ), 3600 );
            if ( !isExistPermissionFromRole!.some( ( permission ) => permission.permissionName === requiredPermission ) ) {
                next( new forbiddenError("you don't have permission to access this route") );
            }
            return next();
        } catch (error) {
            next( new badRequestError(`permission middleware has error : ${ error }`))
        }
    }
}
