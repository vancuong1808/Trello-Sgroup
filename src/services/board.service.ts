import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Board } from '../orm/entities/board.entity.ts';
import { UserBoard } from '../orm/entities/userboard.entity.ts';
import BoardRepository from '../repositories/board.repository.ts';
import UserBoardRepository from '../repositories/userboard.repository.ts';
import UserRepository from '../repositories/user.repository.ts';
import RoleRepository from '../repositories/role.repository.ts';
import { Roles } from '../common/enums/role.ts';
import WorkSpaceRepository from '../repositories/workspace.repository.ts';
import { BoardBody } from '../common/typings/custom.interface';
import { JwtPayload } from 'jsonwebtoken';

class BoardService {
    async getAllBoards( ) : Promise<Result> {
        const boards = await BoardRepository.getAllBoards();
        if (!boards) {
            throw new notFoundError("Boards not found");
        }
        return new Result( true, 200, "Get all boards successful", boards.values );
    }      
    
    async getBoardById( boardId : number ) : Promise<Result> {
        const board = await BoardRepository.getBoardById( boardId );
        if (!board) {
            throw new notFoundError("Board not found");
        }
        return new Result( true, 200, "Get board successful", board );
    }

    async addBoard( owner : string | JwtPayload, workspaceId : number, board : BoardBody ) : Promise<Result> {
        const userId : string = typeof owner === "string" ? owner : owner.userId;
        const isExistedWorkspace = await WorkSpaceRepository.getWorkspaceById( workspaceId );
        if (!isExistedWorkspace) {
            throw new notFoundError("Workspace not found");
        }
        const isExistedBoard = await BoardRepository.getBoardByNameInWorkspace( workspaceId, board.boardName );
        if (isExistedBoard) {
            throw new conflictError("Board already existed");
        }
        const isExistedUser = await UserRepository.getUserById( Number( userId ) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedRole = await RoleRepository.getRoleByName( Roles.BOARD_ADMIN );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const newBoard = new Board();
        newBoard.boardName = board.boardName;
        newBoard.workspace = isExistedWorkspace;
        await BoardRepository.addBoard( newBoard );
        const newUserBoard = new UserBoard();
        newUserBoard.user = isExistedUser;
        const checkBoard = await BoardRepository.getBoardByNameInWorkspace( workspaceId, board.boardName );
        if (!checkBoard) {
            throw new notFoundError("Board not found");
        }
        newUserBoard.board = checkBoard;
        newUserBoard.role = isExistedRole;
        await UserBoardRepository.addMemberToBoard( newUserBoard );
        return new Result( true, 201, "Create board successful" );
    }

    async addMemberToBoard( boardId : number, userId : number ) : Promise<Result> {
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        const isExistedMemberOfBoard = await UserBoardRepository.getMemberById( boardId, userId ); 
        if (isExistedMemberOfBoard) {
            throw new notFoundError("Member of board already existed");
        }
        const isExistedRole = await RoleRepository.getRoleByName( Roles.BOARD_MEMBER );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const newUserBoard = new UserBoard();
        newUserBoard.user = isExistedUser;;
        newUserBoard.board = isExistedBoard; 
        newUserBoard.role = isExistedRole;
        await UserBoardRepository.addMemberToBoard( newUserBoard );
        return new Result( true, 201, "Add member to board successful" );
    }

    async removeMemberFromBoard( boardId : number, userId : number ) : Promise<Result> {
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        const isExistedMemberOfBoard = await UserBoardRepository.getMemberById( boardId, userId );
        if (!isExistedMemberOfBoard) {
            throw new notFoundError("Member of board not found");
        }
        await UserBoardRepository.removeMemberFromBoard( isExistedMemberOfBoard.id );
        return new Result( true, 200, "Remove member from board successful" );
    }

    async changeUserRole( boardId : number, userId : number, roleId : number ) : Promise<Result> {
        const isExistedUser = await UserRepository.getUserById( userId );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        const isExistedMemberOfBoard = await UserBoardRepository.getMemberById( boardId, userId );
        if (!isExistedMemberOfBoard) {
            throw new notFoundError("Member of board not found");
        }
        const isExistedRole = await RoleRepository.getRoleById( roleId );
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        if (isExistedRole.roleName === Roles.BOARD_ADMIN) {
            throw new conflictError("Role not valid");
        }
        if (isExistedRole.roleName !== Roles.BOARD_MEMBER) {
            throw new conflictError("Role not valid");
        }
        const newUserBoard = new UserBoard();
        newUserBoard.user = isExistedUser;
        newUserBoard.board = isExistedBoard; 
        newUserBoard.role = isExistedRole;
        await UserBoardRepository.changeUserRole( isExistedMemberOfBoard.id, newUserBoard );
        return new Result( true, 200, "Change user role successful" );
    }

    async updateBoard( boardId : number, board : Partial<Board> ) : Promise<Result> {
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        await BoardRepository.updateBoard( boardId, board );
        return new Result( true, 200, "Update board successful" );
    }

    async deleteBoard( boardId : number ) : Promise<Result> {
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        await BoardRepository.deleteBoard( boardId );
        return new Result( true, 200, "Delete board successful ");
    }
}
export default new BoardService();
