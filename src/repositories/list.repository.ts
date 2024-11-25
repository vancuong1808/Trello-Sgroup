import { mysqlSource } from '../configs/data-source.config.ts';
import { List } from '../orm/entities/list.entity';

class ListRepository {
    private readonly listRepository = mysqlSource.getRepository(List);

    async getAllLists( boardId : number ): Promise<List[] | null> {
        const lists = await this.listRepository.find({
            select : ["id", "listName"],
            order : {
                id : "asc"
            },
            where : {
                board : {
                    id : boardId
                }
            },
            relations : ["cards"]
        });
        return lists;
    }

    async getListById( boardId : number, listId : number ): Promise<List | null> {
        const list = await this.listRepository.findOne({
            select : ["id", "listName"],
            where : {
                id : listId,
                board : {
                    id : boardId
                }
            },
            relations : ["cards"]
        });
        return list
    }

    async getListByName( boardId : number, name : string ): Promise<List | null> {
        const list = await this.listRepository.findOne({
            select : ["id", "listName"],
            where : {
                listName : name,
                board : {
                    id : boardId
                },
            },
            relations : ["cards"]
        });
        return list;
    }

    async addList( list : List ): Promise<List | null> {
        const newList =  this.listRepository.create( list );
        await this.listRepository.save( newList );
        return newList;
    }

    async updateList( id : number, list : Partial<List> ): Promise<void> {
        await this.listRepository.update( id, list );
    }

    async deleteList( id : number ): Promise<void> {
        await this.listRepository.delete( id );
    }

    async getListsByBoardId( boardId : number ): Promise<List[] | null> {
        const lists = await this.listRepository.find({
            select : ["id", "listName"],
            relations : ["Card"],
            where : {
                board : {
                    id : boardId
                }
            }
        });
        return lists;
    }
}

export default new ListRepository();
