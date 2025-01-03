import { notFoundError } from "../handlers/errors/customError.ts";
import { TodoList } from '../orm/entities/todolist.entity.ts';
import { TodoListBody } from "../common/typings/custom.interface";
import { Result } from '../handlers/result.handler.ts';
import TodoListRepository from '../repositories/todolist.repository.ts';
import CardRepository from '../repositories/card.repository.ts';

class TodoListService {

    async addTodoList( cardId : number, todolistBody : TodoListBody ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const newTodoList = new TodoList();
        newTodoList.card = isExistedCard;
        newTodoList.todolistName = todolistBody.todolistName;
        newTodoList.isDone = false;
        await TodoListRepository.addTodoList( newTodoList );
        return new Result( true, 201, "Create todo list successful" );
    }

    async getAllTodoLists( ) : Promise<Result> {
        const todoLists = await TodoListRepository.getAllTodoLists();
        if (!todoLists) {
            throw new notFoundError("Todo lists not found");
        }
        return new Result( true, 200, "Get todo lists successful", todoLists.values );
    }

    async getTodoListById( todolistId : number ) : Promise<Result> {
        const todoList = await TodoListRepository.getTodoListById( todolistId );
        if (!todoList) {
            throw new notFoundError("Todo list not found");
        }
        return new Result( true, 200, "Get todo list successful", todoList );
    }

    async updateTodoList( todolistId : number, todoList : Partial<TodoList> ) : Promise<Result> {
        const isExistedTodoList = await TodoListRepository.getTodoListById( todolistId );
        if (!isExistedTodoList) {
            throw new notFoundError("Todo list not found");
        }
        await TodoListRepository.updateTodoList( todolistId, todoList );
        return new Result( true, 200, "Update todo list successful" );
    }

    async deleteTodoList( todolistId : number ) : Promise<Result> {
        const isExistedTodoList = await TodoListRepository.getTodoListById( todolistId );
        if (!isExistedTodoList) {
            throw new notFoundError("Todo list not found");
        }
        await TodoListRepository.deleteTodoList( todolistId );
        return new Result( true, 200, "Delete todo list successful" );
    }
}

export default new TodoListService();
