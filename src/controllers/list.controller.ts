import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import { ListBody } from "../common/typings/custom.interface";
import ListService from "../services/list.service";

class ListController {
    async getAllLists( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const result = await ListService.getAllLists();
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getListById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const result = await ListService.getListById( listId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const boardId = Number( req.body.boardId );
            const listBody : ListBody = req.body.listName;
            const result = await ListService.addList( boardId, listBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const listBody : Partial<ListBody> = req.body.listName;
            const result = await ListService.updateList( listId, listBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteList( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.params.listId );
            const result = await ListService.deleteList( listId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }
}
export default new ListController();
