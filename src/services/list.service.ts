import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { List } from '../orm/entities/list.entity.ts';
import BoardRepository from '../repositories/board.repository.ts';
import ListRepository from '../repositories/list.repository.ts';
import { ListBody } from '../common/typings/custom.interface';

class ListService {

    async getAllLists( workspaceId : number, boardId : number ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( workspaceId, boardId );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            const lists = await ListRepository.getAllLists( boardId );
            if (!lists) {
                throw new notFoundError("Lists not found");
            }
            return new Result( true, 200, "Get all lists successful", lists );
        } catch (error) {
            throw error;
        }
    }

    async getListById( workspaceId : number, boardId : number, listId : number ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( workspaceId, boardId );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            const list = await ListRepository.getListById( boardId, listId );
            if (!list) {
                throw new notFoundError("List not found");
            }
            return new Result( true, 200, "Get list successful", list );
        } catch (error) {
            throw error;
        }
    }

    async addList( workspaceId : number, boardId : number, list : ListBody ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( workspaceId, boardId );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            const isExistedList = await ListRepository.getListByName( boardId, list.listName );
            if (isExistedList) {
                throw new conflictError("List already existed");
            }
            const newList = new List();
            newList.listName = list.listName;
            newList.board = isExistedBoard;
            await ListRepository.addList( newList );
            return new Result( true, 201, "Add list successful");
        } catch (error) {
            throw error;
        }
    }

    async updateList( boardId : number, listId : number, list : Partial<List> ) : Promise<Result> {
        try {
            const isExistedList = await ListRepository.getListById( boardId, listId );
            if (!isExistedList) {
                throw new notFoundError("List not found");
            }
            await ListRepository.updateList( listId, list );
            return new Result( true, 200, "Update list successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteList( boardId : number, listId : number ) : Promise<Result> {
        try {
            const isExistedList = await ListRepository.getListById( boardId, listId );
            if (!isExistedList) {
                throw new notFoundError("List not found");
            }
            await ListRepository.deleteList( listId );
            return new Result( true, 200, "Delete list successful" );
        } catch (error) {
            throw error;
        }
    }
}

export default new ListService();

