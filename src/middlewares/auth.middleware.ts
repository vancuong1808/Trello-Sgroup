import { NextFunction, Response } from "express";
import { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../common/typings/custom.interface';
import { badRequestError, unauthorizedError } from "../handlers/errors/customError.ts";
import { verifyToken } from "../utils/jwtToken.util.ts";
import RedisClient from "../common/redis/redis.ts";
export const authenticate : (
    req : CustomRequest,
    res : Response,
    next : NextFunction
) => Promise<void> = async(
    req : CustomRequest, 
    res : Response, 
    next : NextFunction
) => {
    try {
        const header : string = req.headers.authorization || "";
        if ( !header || !header.startsWith('Bearer ') ) {
            next( new unauthorizedError("you must authenticate before") );
        }
        const token : string = header.split(' ')[1];
        const cachedToken : string | null = await RedisClient.getString(`token:${ token }`);
        if ( cachedToken ) {
            req.user = JSON.parse( cachedToken );
            return next();
        }
        const decoded : string | JwtPayload = verifyToken( token );
        await RedisClient.setString( `token:${ token }`, JSON.stringify(decoded), 3600 );
        req.user = decoded;
        return next();
    } catch (error : unknown ) {
        next( new badRequestError(`${error}`) );
    }
}
