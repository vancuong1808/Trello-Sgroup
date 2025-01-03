import { mysqlSource } from '../configs/data-source.config.ts';
import { Todo } from '../orm/entities/todo.entity.ts';

class TodoRepository {
    private readonly todoRepository = mysqlSource.getRepository(Todo);

    async addTodo( todo : Todo ): Promise<Todo | null> {
        const newTodo = this.todoRepository.create( todo );
        await this.todoRepository.save( newTodo );
        return newTodo;
    }

    async getAllTodos(): Promise<Todo[] | null> {
        const todos = await this.todoRepository.find({
            select : ["id", "todoName", "isDone"],
            order : {
                id : "asc"
            },
            relations : ["todoList", "todoList.isDone", "todoList.todos"]
        });
        return todos;
    }

    async getTodosInTodoListId( todoListId : number ): Promise<Todo[] | null> {
        const todos = await this.todoRepository.find({
            select : ["id", "todoName", "isDone"],
            where : {
                todoList : {
                    id : todoListId
                }
            },
            relations : ["todoList", "todoList.isDone", "todoList.todos"]
        });
        return todos;
    }

    async getTodoById( todoId : number ): Promise<Todo | null> {
        const todo = await this.todoRepository.findOne({
            select : ["id", "todoName", "isDone"],
            where : {
                id : todoId
            },
            relations : ["todoList", "todoList.isDone", "todoList.todos"]
        });
        return todo;
    }

    async getTodoByName( name : string ): Promise<Todo | null> {
        const todo = await this.todoRepository.findOne({
            select : ["id", "todoName", "isDone"],
            where : {
                todoName : name
            },
            relations : ["todoList", "todoList.isDone", "todoList.todos"]
        });
        return todo;
    }

    async updateTodo( todoId : number, todo : Partial<Todo> ): Promise<void> {
        await this.todoRepository.update( todoId, todo );
    }

    async deleteTodo( todoId : number ): Promise<void> {
        await this.todoRepository.delete( todoId );
    }

}

export default new TodoRepository();
