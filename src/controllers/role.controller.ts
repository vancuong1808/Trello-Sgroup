import roleService from "../services/role.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { RoleBody } from "../common/typings/custom.interface";

class RoleController {

    async addRole( req : Request, res : Response, next : NextFunction ) {
        try {
            const body : RoleBody = req.body;
            const registerResult = await roleService.addRole( body );
            responseHandler.created( res, registerResult.message, registerResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getAllRoles( req : Request, res : Response, next : NextFunction ) {
        try {
            const getAllRolesResult = await roleService.getAllRoles();
            responseHandler.ok( res, getAllRolesResult.message, getAllRolesResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getRoleById( req : Request, res : Response, next : NextFunction ) {
        try {
            const roleId : number = Number( req.params.roleId );
            const getRoleByIdResult = await roleService.getRoleById( roleId );
            responseHandler.ok( res, getRoleByIdResult.message, getRoleByIdResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async updateRole( req : Request, res : Response, next : NextFunction ) {
        try {
            const roleId : number = Number( req.params.roleId );
            const body : RoleBody = req.body;
            const updateRoleResult = await roleService.updateRole( roleId, body );
            responseHandler.ok( res, updateRoleResult.message, updateRoleResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async deleteRole( req : Request, res : Response, next : NextFunction ) {
        try {
            const roleId : number = Number( req.params.roleId );
            const deleteRoleResult = await roleService.deleteRole( roleId );
            responseHandler.ok( res, deleteRoleResult.message, deleteRoleResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async assignPermissionToRole( req : Request, res : Response, next : NextFunction ) {
        try {
            const roleId : number = Number( req.params.roleId );
            const permissionId : number = Number( req.params.permissionId );
            const assignRoleToUserResult = await roleService.assignPermissionToRole( roleId, permissionId );
            responseHandler.ok( res, assignRoleToUserResult.message, assignRoleToUserResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async removePermissionFromRole( req : Request, res : Response, next : NextFunction ) {
        try {
            const roleId : number = Number( req.params.roleId );
            const permissionId : number = Number( req.params.permissionId );
            const assignRoleToUserResult = await roleService.removePermissionFromRole( roleId, permissionId );
            responseHandler.ok( res, assignRoleToUserResult.message, assignRoleToUserResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new RoleController();
