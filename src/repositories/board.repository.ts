import { mysqlSource } from '../configs/data-source.config.ts';
import { Board } from '../orm/entities/board.entity';

export class BoardRepository {
    private readonly boardRepository = mysqlSource.getRepository(Board);

    async getAllBoards(): Promise<Board[] | null> {
        const boards = await this.boardRepository.find({
            select : ["id", "boardName"],
            order : {
                id : "ASC"
            }
        });
        return boards;
    }
    async getBoardById( id : number ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                id : id
            }
        });
        return board
    }

    async getBoardByName( name : string ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                boardName : name
            }
        });
        return board;
    }

    async addBoard( board : Board ): Promise<Board | null> {
       const newBoard = this.boardRepository.create( board );
        await this.boardRepository.save( newBoard );
        return newBoard;
    }

    async updateBoard( id : number, board : Partial<Board> ): Promise<void> {
        await this.boardRepository.update( id, board );
    }

    async deleteBoard( id : number ): Promise<void> {
        await this.boardRepository.delete( id );
    }
}
export default new BoardRepository();
