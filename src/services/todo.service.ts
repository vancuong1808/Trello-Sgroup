import { notFoundError } from "../handlers/errors/customError.ts";
import { Result } from '../handlers/result.handler.ts';
import { TodoBody } from "../common/typings/custom.interface";
import { Todo } from '../orm/entities/todo.entity.ts';
import TodoRepository from "../repositories/todo.repository";
import TodoListRepository from "../repositories/todolist.repository";


class TodoService {
    
    async addTodo( todolistId : number, todoBody : TodoBody ) : Promise<Result> {
        const isExistedTodoList = await TodoListRepository.getTodoListById( todolistId );
        if (!isExistedTodoList) {
            throw new notFoundError("Todo list not found");
        }
        const newTodo = new Todo();
        newTodo.todoName = todoBody.todoName;
        newTodo.isDone = false;
        newTodo.todoList = isExistedTodoList;
        await TodoRepository.addTodo( newTodo );
        return new Result( true, 201, "Create todo successful" );
    }

    async getAllTodos( ) : Promise<Result> {
        const todos = await TodoRepository.getAllTodos();
        if (!todos) {
            throw new notFoundError("Todos not found");
        }
        return new Result( true, 200, "Get todos successful", todos.values );
    }

    async getTodoById( todoId : number ) : Promise<Result> {
        const todo = await TodoRepository.getTodoById( todoId );
        if (!todo) {
            throw new notFoundError("Todo not found");
        }
        return new Result( true, 200, "Get todo successful", todo );
    }

    async updateTodo( todoId : number, todo : Partial<Todo> ) : Promise<Result> {
        const isExistedTodo = await TodoRepository.getTodoById( todoId );
        if (!isExistedTodo) {
            throw new notFoundError("Todo not found");
        }
        await TodoRepository.updateTodo( todoId, todo );
        return new Result( true, 200, "Update todo successful" );
    }

    async deleteTodo( todoId : number ) : Promise<Result> {
        const isExistedTodo = await TodoRepository.getTodoById( todoId );
        if (!isExistedTodo) {
            throw new notFoundError("Todo not found");
        }
        await TodoRepository.deleteTodo( todoId );
        return new Result( true, 200, "Delete todo successful" );
    }

    async checkTodo( todoId : number ) : Promise<Result> {
        const isExistedTodo = await TodoRepository.getTodoById( todoId );
        if (!isExistedTodo) {
            throw new notFoundError("Todo not found");
        }
        isExistedTodo.isDone = !isExistedTodo.isDone;
        await TodoRepository.updateTodo( todoId, isExistedTodo );
        const checkTodo = await TodoRepository.getTodoById( todoId );
        if (!checkTodo) {
            throw new notFoundError("Todo not found");
        }
        const isDone = checkTodo.todoList.todos.some( (todo) => todo.isDone === true );
        checkTodo.todoList.isDone = isDone;
        await TodoListRepository.updateTodoList( checkTodo.todoList.id, checkTodo.todoList );
        return new Result( true, 200, "Check todo successful" );
    }
}

export default new TodoService();
