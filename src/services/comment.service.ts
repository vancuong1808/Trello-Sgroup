import { notFoundError } from "../handlers/errors/customError.ts";
import { Result } from '../handlers/result.handler.ts';
import { CommentBody } from "../common/typings/custom.interface";
import { Comment } from '../orm/entities/comment.entity.ts';
import CardRepository from "../repositories/card.repository";
import CommentRepository from "../repositories/comment.repository";
import userRepository from "../repositories/user.repository.ts";

class CommentService {
    async addComment( cardId : number, userId : string, comment : CommentBody ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const isExistedUser = await userRepository.getUserById( Number(userId) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const newComment = new Comment();
        newComment.comment = comment.comment;
        newComment.user = isExistedUser;
        newComment.card = isExistedCard;
        await CommentRepository.addComment( newComment );
        return new Result( true, 201, "Create comment successful" );
    }

    async getAllComments( ) : Promise<Result> {
        const comments = await CommentRepository.getAllComments( );
        if (!comments) {
            throw new notFoundError("Comments not found");
        }
        return new Result( true, 200, "Get comments successful", comments );
    }


    async getCommentById( commentId : number ) : Promise<Result> {
        const comment = await CommentRepository.getCommentById( commentId );
        if (!comment) {
            throw new notFoundError("Comment not found");
        }
        return new Result( true, 200, "Get comment successful", comment );
    }

    async updateComment( commentId : number, comment : Partial<CommentBody> ) : Promise<Result> {
        const isExistedComment = await CommentRepository.getCommentById( commentId );
        if (!isExistedComment) {
            throw new notFoundError("Comment not found");
        }
        await CommentRepository.updateComment( commentId, comment );
        return new Result( true, 200, "Update comment successful" );
    }

    async deleteComment( commentId : number ) : Promise<Result> {
        const isExistedComment = await CommentRepository.getCommentById( commentId );
        if (!isExistedComment) {
            throw new notFoundError("Comment not found");
        }
        await CommentRepository.deleteComment( commentId );
        return new Result( true, 200, "Delete comment successful" );
    }
}

export default new CommentService();
