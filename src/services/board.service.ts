import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Board } from '../orm/entities/board.entity.ts';
import BoardRepository from '../repositories/board.repository.ts';
import WorkSpaceRepository from '../repositories/workspace.repository.ts';
import { BoardBody } from '../common/typings/custom.interface';


class BoardService {
    async getAllBoards() : Promise<Result> {
    try {
            const boards = await BoardRepository.getAllBoards();
            if (!boards) {
                throw new notFoundError("Boards not found");
            }
            return new Result( true, 200, "Get all boards successful", { boards } );
        } catch (error : unknown) {
            throw error;
        }
    }      
    
    async getBoardById( id : number ) : Promise<Result> {
        try {
            const board = await BoardRepository.getBoardById( id );
            if (!board) {
                throw new notFoundError("Board not found");
            }
            return new Result( true, 200, "Get board successful", { board } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async addBoard( board : BoardBody ) : Promise<Result> {
        try {
            const isExistedWorkspace = await WorkSpaceRepository.getWorkspaceById( board.workspaceId );
            if (!isExistedWorkspace) {
                throw new notFoundError("Workspace not found");
            }
            const isExistedBoard = await BoardRepository.getBoardByName( board.boardName );
            if (isExistedBoard) {
                throw new conflictError("Board already existed");
            }
            const newBoard = new Board();
            newBoard.boardName = board.boardName;
            newBoard.workspace = isExistedWorkspace;
            await BoardRepository.addBoard( newBoard );
            return new Result( true, 200, "Create board successful", { newBoard } );
        } catch (error : unknown) {
            throw error;
        }
    }

    async updateBoard( id : number, board : Partial<Board> ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( id );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            await BoardRepository.updateBoard( id, board );
            return new Result( true, 200, "Update board successful" );
        } catch (error : unknown) {
            throw error;
        }
    }

    async deleteBoard( id : number ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( id );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            await BoardRepository.deleteBoard( id );
            return new Result( true, 200, "Delete board successful", { isExistedBoard } );
        } catch (error : unknown) {
            throw error;
        }
    }
}

export default new BoardService();
