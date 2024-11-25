import permissionService from "../services/permission.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { PermissionBody } from "../common/typings/custom.interface";

class PermissionController {

    async addPermission( req : Request, res : Response, next : NextFunction ) {
        try {
            const body : PermissionBody = req.body;
            const registerResult = await permissionService.addPermission( body );
            responseHandler.created( res, registerResult.message, registerResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getAllPermissions( req : Request, res : Response, next : NextFunction ) {
        try {
            const getAllPermissionsResult = await permissionService.getAllPermissions();
            responseHandler.ok( res, getAllPermissionsResult.message, getAllPermissionsResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getPermissionById( req : Request, res : Response, next : NextFunction ) {
        try {
            const permissionId : number = Number( req.params.permissionId );
            const getPermissionByIdResult = await permissionService.getPermissionById( permissionId );
            responseHandler.ok( res, getPermissionByIdResult.message, getPermissionByIdResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async updatePermission( req : Request, res : Response, next : NextFunction ) {
        try {
            const permissionId : number = Number( req.params.permissionId );
            const body : PermissionBody = req.body;
            const updateRoleResult = await permissionService.updatePermission( permissionId, body );
            responseHandler.ok( res, updateRoleResult.message, updateRoleResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async deletePermission( req : Request, res : Response, next : NextFunction ) {
        try {
            const permissionId : number = Number( req.params.permissionId );
            const deletePermissionResult = await permissionService.deletePermission( permissionId );
            responseHandler.ok( res, deletePermissionResult.message, deletePermissionResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new PermissionController();
