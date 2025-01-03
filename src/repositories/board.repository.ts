import { mysqlSource } from '../configs/data-source.config.ts';
import { Board } from '../orm/entities/board.entity';

export class BoardRepository {
    private readonly boardRepository = mysqlSource.getRepository(Board);

    async getAllBoards(): Promise<Board[] | null> {
        const boards = await this.boardRepository.find({
            select : ["id", "boardName"],
            order : {
                id : "ASC"
            },
            relations : ["userBoards.user", "userBoards.role", "lists", "workspace"]
        });
        return boards;
    }

    async getBoardById( boardId : number ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                id : boardId
            },
            relations : ["userBoards.user", "userBoards.role", "lists", "workspace"]
        });
        return board;
    }

    async getBoardByName( name : string ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                boardName : name
            },
            relations : ["userBoards.user", "userBoards.role", "lists", "workspace"]
        });
        return board;
    }

    async getAllBoardsInWorkspace( workspaceId : number ): Promise<Board[] | null> {
        const boards = await this.boardRepository.find({
            select : ["id", "boardName"],
            order : {
                id : "ASC"
            },
            where : {
                workspace : {
                    id : workspaceId
                }
            },
            relations : ["userBoards.user", "userBoards.role","lists"]
        });
        return boards;
    }
    async getBoardByIdInWorkspace( workspaceId : number, boardId : number ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                id : boardId,
                workspace : {
                    id : workspaceId
                },
            },
            relations : ["userBoards.user", "userBoards.role","lists"]
        });
        return board
    }

    async getBoardByNameInWorkspace( workspaceId : number, name : string ): Promise<Board | null> {
        const board = await this.boardRepository.findOne({
            select : ["id", "boardName"],
            where : {
                boardName : name,
                workspace : {
                    id : workspaceId
                },
            },

            relations : ["userBoards.user", "userBoards.role","lists"]
        });
        return board;
    }

    async getBoardRelateWithList( boardId : number ): Promise<Board | null> {
        const boards = await this.boardRepository.find({
            relations : ["lists"],
            where : {
                id : boardId
            }
        });
        return boards[0];
    }

    async addBoard( board : Board ): Promise<Board | null> {
       const newBoard = this.boardRepository.create( board );
        await this.boardRepository.save( newBoard );
        return newBoard;
    }

    async updateBoard( boardId : number, board : Partial<Board> ): Promise<void> {
        await this.boardRepository.update( boardId, board );
    }

    async deleteBoard( boardId : number ): Promise<void> {
        await this.boardRepository.delete( boardId );
    }
}
export default new BoardRepository();
