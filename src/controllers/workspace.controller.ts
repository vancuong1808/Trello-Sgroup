import { NextFunction, Request, Response } from "express";
import { CustomRequest, WorkSpaceBody } from "../common/typings/custom.interface";
import responseHandler from "../handlers/response.handler";
import workspaceService from "../services/workspace.service";

class WorkSpaceController {
    async addWorkspace(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const workspaceBody : WorkSpaceBody = req.body;
            const userId: string = typeof req.user === "string" ? req.user : req.user?.userId;
            const workspace = await workspaceService.addWorkspace( userId, workspaceBody );
            responseHandler.created(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }   

    async getAllWorkspaces(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaces = await workspaceService.getAllWorkspace();
            responseHandler.ok(res, workspaces.message, workspaces.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }

    async getWorkspaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.params.workspaceId);
            const workspace = await workspaceService.getWorkspaceById(workspaceId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }

    async getWorkspaceByName(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceName = req.params.name;
            const workspace = await workspaceService.getWorkspaceByName(workspaceName);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }

    async addMemberToWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.body.workspaceId);
            const userId = Number(req.body.userId);
            const workspace = await workspaceService.addMemberToWorkspace(workspaceId, userId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }

    async removeMemberFromWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.body.workspaceId);
            const userId = Number(req.body.userId);
            const workspace = await workspaceService.removeMemberFromWorkspace(workspaceId, userId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }

    async updateWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.params.workspaceId);
            const workspaceBody : WorkSpaceBody = req.body;
            const workspace = await workspaceService.updateWorkspace(workspaceId, workspaceBody);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }
    async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.params.workspaceId);
            const workspace = await workspaceService.deleteWorkspace(workspaceId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }
}

export default new WorkSpaceController()
