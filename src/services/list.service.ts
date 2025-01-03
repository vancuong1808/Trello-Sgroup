import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { List } from '../orm/entities/list.entity.ts';
import BoardRepository from '../repositories/board.repository.ts';
import ListRepository from '../repositories/list.repository.ts';
import { ListBody } from '../common/typings/custom.interface';

class ListService {

    async getAllLists() : Promise<Result> {
        const lists = await ListRepository.getAllLists();
        if (!lists) {
            throw new notFoundError("Lists not found");
        }
        return new Result( true, 200, "Get all lists successful", lists.values );
    }

    async getListById( listId : number ) : Promise<Result> {
        const list = await ListRepository.getListById( listId );
        if (!list) {
            throw new notFoundError("List not found");
        }
        return new Result( true, 200, "Get list successful", list );
    }

    async addList( boardId : number, list : ListBody ) : Promise<Result> {
        const isExistedBoard = await BoardRepository.getBoardById( boardId );
        if (!isExistedBoard) {
            throw new notFoundError("Board not found");
        }
        const isExistedList = await ListRepository.getListByName( list.listName );
        if (isExistedList) {
            throw new conflictError("List already existed");
        }
        const newList = new List();
        newList.listName = list.listName;
        newList.board = isExistedBoard;
        await ListRepository.addList( newList );
        return new Result( true, 201, "Add list successful");
    }

    async updateList( listId : number, list : Partial<List> ) : Promise<Result> {
        const isExistedList = await ListRepository.getListById( listId );
        if (!isExistedList) {
            throw new notFoundError("List not found");
        }
        await ListRepository.updateList( listId, list );
        return new Result( true, 200, "Update list successful" );
    }

    async deleteList( listId : number ) : Promise<Result> {
        const isExistedList = await ListRepository.getListById( listId );
        if (!isExistedList) {
            throw new notFoundError("List not found");
        }
        await ListRepository.deleteList( listId );
        return new Result( true, 200, "Delete list successful" );
    }
}

export default new ListService();

