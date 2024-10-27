import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user? : string | JwtPayload
}

export interface CustomError {
    customMessage?: string | string[],
}

export interface CustomResponseResult {
    isOk: boolean
    status?: number
    message: string | string[]
    data?: object
}

export interface RegisterBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}

export interface LoginBody {
    email: string;
    password: string
}

export interface RoleBody {
    roleName: string
}

export interface PermissionBody {
    permissionName: string
}

export interface UserBody {
    username: string
    email: string
    password: string
}

export interface UserRoleBody {
    userId: number
    roleId: number
}

export interface RolePermissionBody {
    roleId: number
    permissionId: number
}