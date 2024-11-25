import { Response, NextFunction } from "express";
import { badRequestError, forbiddenError, unauthorizedError } from "../handlers/errors/customError";
import { CustomRequest } from "../common/typings/custom.interface.d";
import UserRepository from "../repositories/user.repository";
import UserBoardRepository from "../repositories/userboard.repository";
import UserWorkspaceRepository from "../repositories/userworkspace.repository";
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
            const userId: string = typeof req.user === "string" ? req.user : req.user?.userId;
            if ( !userId ) {
                next( new unauthorizedError("you must authenticate before") );
            }
            const user = await UserRepository.getUserById( Number(userId) );
            if ( !user ) {
                next( new unauthorizedError("not found user") );
            }
            const isExistRoleFromUser = await UserRepository.getUserRelateWithRole( Number(userId) );
            if ( !isExistRoleFromUser ) {
                next( new unauthorizedError("Find user relate with role fail") );
            }
            var rolesFromUser : number[] = [];
            const cachedRoles : string | null = await RedisClient.getString( `rolesOfUser:${ userId }` );
            if ( cachedRoles ) {
                rolesFromUser = JSON.parse( cachedRoles );
            } else {
                rolesFromUser = isExistRoleFromUser!.roles.map(( role : Role ) => role.id);
                await RedisClient.setString( `rolesOfUser:${ userId }`, JSON.stringify( rolesFromUser ), 3600 );
            }
            const workspaceId: number = Number( req.params.workspaceId );
            if ( workspaceId ) {
                const isExistMemberOfWorkspace = await UserWorkspaceRepository.getMemberById( workspaceId, Number(userId) ); 
                if ( isExistMemberOfWorkspace ) {
                    rolesFromUser.push( isExistMemberOfWorkspace!.role.id );
                }
            }
            const boardId: number = Number( req.params.boardId );
            if ( boardId ) {
                const isExistMemberOfBoard = await UserBoardRepository.getMemberById(  boardId, Number(userId) ); 
                if ( isExistMemberOfBoard ) {
                    rolesFromUser.push( isExistMemberOfBoard!.role.id );
                }   
            }
            const isExistPermissionFromRole = await PermissionRepository.getAllPermissionsRelateWithRole( rolesFromUser );
            if ( !isExistPermissionFromRole ) {
                next( new unauthorizedError("Find all permissions relate with role fail") );
            }
            if ( !isExistPermissionFromRole!.some( ( permission ) => permission.permissionName === requiredPermission ) ) {
                next( new forbiddenError("you don't have permission to access this route") );
            }
            next();
        } catch (error) {
            next( new badRequestError(`permission middleware has error : ${ error }`))
        }
    }
}
