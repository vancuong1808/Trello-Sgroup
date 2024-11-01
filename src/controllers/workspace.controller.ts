import workspaceService from "../services/workspace.service";
import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import { WorkSpaceBody } from "../common/typings/custom.interface";

class WorkSpaceController {
    async addWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceBody : WorkSpaceBody = req.body;
            const workspace = await workspaceService.createWorkspace( workspaceBody );
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
            const workspaceId = Number(req.params.id);
            const workspace = await workspaceService.getWorkspaceById(workspaceId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }
    async updateWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = Number(req.params.id);
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
            const workspaceId = Number(req.params.id);
            const workspace = await workspaceService.deleteWorkspace(workspaceId);
            responseHandler.ok(res, workspace.message, workspace.data || {});
        }
        catch (error: unknown) {
            next(error);
        }
    }
}

export default new WorkSpaceController()