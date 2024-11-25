import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { File } from "multer";

export interface CustomRequest extends Request {
    user? : string | JwtPayload
    file? : File
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
}

export interface WorkSpaceBody {
    workspaceName: string
}

export interface BoardBody {
    boardName: string
}

export interface ListBody {
    listName: string
}

export interface CardBody {
    cardName: string
}

export interface TodoListBody {
    todoListName: string
}

export interface TodoBody {
    todoName: string
}

export interface CommentBody {
    comment: string
}

export interface Client {
    id: Date
    workspaceId: number
    userId: number
    res : Response
}
