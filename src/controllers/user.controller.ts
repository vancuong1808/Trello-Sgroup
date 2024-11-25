import userService from "../services/user.service.ts";
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { UserBody } from "../common/typings/custom.interface";

class UserController {
    async updateUser( req : Request, res : Response, next : NextFunction ) {
        try {
            const userId : number = Number( req.params.userId );
            const body : UserBody = req.body;
            const updateResult = await userService.updateUser( userId, body );
            responseHandler.ok( res, updateResult.message, updateResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async deleteUser( req : Request, res : Response, next : NextFunction ) {
        try {
            const userId : number = Number( req.params.userId );
            const deleteResult = await userService.deleteUser( userId );
            responseHandler.ok( res, deleteResult.message, deleteResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getUserById( req : Request, res : Response, next : NextFunction ) {
        try {
            const userId : number = Number( req.params.userId );
            const getResult = await userService.getUserById( userId );
            responseHandler.ok( res, getResult.message, getResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async getAllUsers( req : Request, res : Response, next : NextFunction ) {
        try {
            const getUsersResult = await userService.getAllUsers();
            responseHandler.ok( res, getUsersResult.message, getUsersResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async assignRoleToUser( req : Request, res : Response, next : NextFunction ) {
        try {
            const userId : number = Number( req.params.userId );
            const roleId : number = Number( req.params.roleId );
            const assignResult = await userService.assignRoleToUser( userId, roleId );
            responseHandler.ok( res, assignResult.message, assignResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async removeRoleFromUser( req : Request, res : Response, next : NextFunction ) {
        try {
            const userId : number = Number( req.params.userId );
            const roleId : number = Number( req.params.roleId );
            const assignResult = await userService.removeRoleFromUser( userId, roleId );
            responseHandler.ok( res, assignResult.message, assignResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new UserController()
