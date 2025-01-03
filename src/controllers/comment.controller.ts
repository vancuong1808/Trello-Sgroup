import { Request, Response, NextFunction } from 'express';
import responseHandler from '../handlers/response.handler';
import CommentService from '../services/comment.service';
import { CommentBody } from '../common/typings/custom.interface';
import { CustomRequest } from '../common/typings/custom.interface';

class CommentController {
    
    async addComment( req : CustomRequest, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const commentBody : CommentBody = req.body.commentBody;
            const userId : string = typeof req.user === "string" ? req.user : req.user?.userId;
            const result = await CommentService.addComment( cardId, userId, commentBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCommentById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const commentId = Number( req.params.commentId );
            const result = await CommentService.getCommentById( commentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getAllComments( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const result = await CommentService.getAllComments();
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateComment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const commentId = Number( req.params.commentId );
            const commentBody : Partial<CommentBody> = req.body.commentBody;
            const result = await CommentService.updateComment( commentId, commentBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteComment( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const commentId = Number( req.params.commentId );
            const result = await CommentService.deleteComment( commentId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

}

export default new CommentController();
