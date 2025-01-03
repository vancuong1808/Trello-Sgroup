import { mysqlSource } from '../configs/data-source.config.ts';
import { Comment } from '../orm/entities/comment.entity.ts';

class CommentRepository {
    private readonly commentRepository = mysqlSource.getRepository(Comment);

    async addComment( comment : Comment ): Promise<Comment | null> {
        const newComment = this.commentRepository.create( comment );
        await this.commentRepository.save( newComment );
        return newComment;
    }

    async getAllComments(): Promise<Comment[] | null> {
        const comments = await this.commentRepository.find({
            select : ["id", "comment"],
            order : {
                id : "asc"
            },
            relations : ["card"]
        });
        return comments;
    }

    async getCommentsInCard( cardId : number ): Promise<Comment[] | null> {
        const comments = await this.commentRepository.find({
            select : ["id", "comment"],
            where : {
                card : {
                    id : cardId
                }
            },
            relations : ["card"]
        });
        return comments;
    }

    async getCommentById( commentId : number ): Promise<Comment | null> {
        const comment = await this.commentRepository.findOne({
            select : ["id", "comment"],
            where : {
                id : commentId
            },
            relations : ["card"]
        });
        return comment;
    }

    async updateComment( commentId : number, comment : Partial<Comment> ): Promise<void> {
        await this.commentRepository.update( commentId, comment );
    }

    async deleteComment( commentId : number ): Promise<void> {
        await this.commentRepository.delete( commentId );
    }
}
export default new CommentRepository();
