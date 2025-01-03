import { mysqlSource } from '../configs/data-source.config.ts';
import { TodoList } from '../orm/entities/todolist.entity.ts';

class TodoListRepository {
    private readonly todoListRepository = mysqlSource.getRepository(TodoList);

    async addTodoList( todoList : TodoList ): Promise<TodoList | null> {
        const newTodoList = this.todoListRepository.create( todoList );
        await this.todoListRepository.save( newTodoList );
        return newTodoList;
    }

    async getAllTodoLists(): Promise<TodoList[] | null> {
        const todoLists = await this.todoListRepository.find({
            select : ["id", "todolistName", "isDone"],
            order : {
                id : "asc"
            },
            relations : ["card", "todos"]
        });
        return todoLists;
    }

    async getTodoListsInCard( cardId : number ): Promise<TodoList[] | null> {
        const todoLists = await this.todoListRepository.find({
            select : ["id", "todolistName", "isDone"],
            where : {
                card : {
                    id : cardId
                }
            },
            relations : ["card", "todos"]
        });
        return todoLists;
    }

    async getTodoListById( todoListId : number ): Promise<TodoList | null> {
        const todoList = await this.todoListRepository.findOne({
            select : ["id", "todolistName", "isDone"],
            where : {
                id : todoListId
            },
            relations : ["card", "todos"]
        });
        return todoList;
    }

    async getTodoListByName( name : string ): Promise<TodoList | null> {
        const todoList = await this.todoListRepository.findOne({
            select : ["id", "todolistName", "isDone"],
            where : {
                todolistName : name
            },
            relations : ["card", "todos"]
        });
        return todoList;
    }

    async updateTodoList( todoListId : number, todoList : Partial<TodoList> ): Promise<void> {
        await this.todoListRepository.update( todoListId, todoList );
    }

    async deleteTodoList( todoListId : number ): Promise<void> {
        await this.todoListRepository.delete( todoListId );
    }

}

export default new TodoListRepository();
