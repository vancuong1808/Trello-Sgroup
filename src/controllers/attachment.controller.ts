import { Request, Response, NextFunction } from "express";
import responseHandler from "../handlers/response.handler";
import AttachmentService from "../services/attachment.service";

class AttachmentController {

    async uploadAttachment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const file  = req.file;
            if (!file) {
                responseHandler.badRequest( res, "File is required" );
                return;
            }
            const result = await AttachmentService.addAttachment( cardId, file );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteAttachment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const attachmentId = Number( req.params.attachmentId );
            const result = await AttachmentService.deleteAttachment( cardId, attachmentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

}

export default new AttachmentController();
