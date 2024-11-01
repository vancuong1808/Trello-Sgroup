import { mysqlSource } from '../configs/data-source.config.ts';
import { badRequestError } from "../handlers/errors/customError";
import { Board } from '../orm/entities/board.entity';

export class BoardRepository {
    private readonly boardRepository = mysqlSource.getRepository(Board);

    async getAllBoards(): Promise<Board[] | null> {
        try {
            const boards = await this.boardRepository.find({
                select : ["id", "boardName"],
                order : {
                    id : "ASC"
                }
            });
            return boards;
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }
    async getBoardById( id : number ): Promise<Board | null> {
        try {
            const board = await this.boardRepository.findOne({
                select : ["id", "boardName"],
                where : {
                    id : id
                }
            });
            return board
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }

    async getBoardByName( name : string ): Promise<Board | null> {
        try {
            const board = await this.boardRepository.findOne({
                select : ["id", "boardName"],
                where : {
                    boardName : name
                }
            });
            return board;
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }

    async addBoard( board : Board ): Promise<Board | null> {
        try {
            const newBoard = await this.boardRepository.create( board );
            await this.boardRepository.save( newBoard );
            return newBoard;
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }

    async updateBoard( id : number, board : Partial<Board> ): Promise<void> {
        try {
            await this.boardRepository.update( id, board );
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }

    async deleteBoard( id : number ): Promise<void> {
        try {
            await this.boardRepository.softDelete( id );
        } catch (error) {
            throw new badRequestError(`BoardRepository has error : ${ error }`);
        }
    }
}

export default new BoardRepository();