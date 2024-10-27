import authService from "../services/auth.service.ts"
import responseHandler from "../handlers/response.handler.ts";
import { NextFunction, Request, Response } from "express";
import { LoginBody, RegisterBody } from "../common/typings/custom.interface.ts";

class AuthController {
    async register( req : Request, res : Response, next : NextFunction ) {
        try {
            const body : RegisterBody = req.body;
            const registerResult = await authService.register( body );
            responseHandler.created( res, registerResult.message, registerResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }

    async login( req : Request, res : Response, next : NextFunction ) {
        try {
            const body : LoginBody = req.body;
            const loginResult = await authService.login( body );
            responseHandler.ok( res, loginResult.message, loginResult.data || {} );
        } catch (error : unknown) {
            next( error );
        }
    }
}

export default new AuthController()