import { v2 as cloudinary } from 'cloudinary';
import { CardBody, TodoBody, TodoListBody, CommentBody } from '../common/typings/custom.interface';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Result } from '../handlers/result.handler.ts';
import { Attachment } from '../orm/entities/attachment.entity.ts';
import { Card } from '../orm/entities/card.entity.ts';
import { Todo } from '../orm/entities/todo.entity.ts';
import { TodoList } from '../orm/entities/todolist.entity.ts';
import { Comment } from '../orm/entities/comment.entity.ts';
import CardRepository from '../repositories/card.repository.ts';
import ListRepository from '../repositories/list.repository.ts';

class CardService {

    async getAllCards( boardId : number, listId : number ) : Promise<Result> {
        try {
            const isExistedList = await ListRepository.getListById( boardId, listId );
            if (!isExistedList) {
                throw new notFoundError("List not found");
            }
            const cards = await CardRepository.getAllcards( listId );
            if (!cards) {
                throw new notFoundError("Cards not found");
            }
            return new Result( true, 200, "Get all cards successful", cards );
        } catch (error) {
            throw error;
        }
    }

    async getCardById( boardId : number, listId : number, cardId : number ) : Promise<Result> {
        try {
            const isExistedList = await ListRepository.getListById( boardId, listId );
            if (!isExistedList) {
                throw new notFoundError("List not found");
            }
            const card = await CardRepository.getCardById( listId, cardId );
            if (!card) {
                throw new notFoundError("Card not found");
            }
            return new Result( true, 200, "Get card successful", card );
        } catch (error) {
            throw error;
        }
    }

    async addCard( boardId : number, listId : number, card : CardBody ) : Promise<Result> {
        try {
            const isExistedList = await ListRepository.getListById( boardId, listId );
            if (!isExistedList) {
                throw new notFoundError("List not found");
            }
            const isExistedCard = await CardRepository.getCardByName( listId, card.cardName );
            if (isExistedCard) {
                throw new conflictError("Card already existed");
            }
            const newCard = new Card();
            newCard.cardName = card.cardName;
            newCard.list = isExistedList;
            await CardRepository.addCard( newCard );
            return new Result( true, 201, "Create card successful" );
        } catch (error) {
            throw error;
        }
    }

    async updateCard( listId : number, cardId : number, card : Partial<Card> ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            await CardRepository.updateCard( cardId, card );
            return new Result( true, 200, "Update card successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteCard( listId : number, cardId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            await CardRepository.deleteCard( cardId );
            return new Result( true, 200, "Delete card successful" );
        } catch (error) {
            throw error;
        }
    }

    async addAttachment( listId : number, cardId : number, file : Express.Multer.File ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );   
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const newAttachment = new Attachment();
            newAttachment.fileName = file.originalname;
            newAttachment.filePath = file.path;
            newAttachment.publicId = file.filename;
            newAttachment.card = isExistedCard;
            await CardRepository.addAttachment( newAttachment );
            return new Result( true, 201, "Create attachment successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteAttachment( listId : number, cardId : number, attachmentId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedAttachment = await CardRepository.getAttachmentById( cardId, attachmentId );
            if (!isExistedAttachment) {
                throw new notFoundError("Attachment not found");
            }
            if (isExistedAttachment.publicId) {
                await cloudinary.uploader.destroy(isExistedAttachment.publicId);
            }
            await CardRepository.deleteAttachment( attachmentId );
            return new Result( true, 200, "Delete attachment successful" );
        } catch (error) {
            throw error;
        }
    }

    async updateAttachment( listId : number, cardId : number, attachmentId : number, file : Express.Multer.File ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedAttachment = await CardRepository.getAttachmentById( cardId, attachmentId );
            if (!isExistedAttachment) {
                throw new notFoundError("Attachment not found");
            }
            if (isExistedAttachment.publicId) {
                await cloudinary.uploader.destroy(isExistedAttachment.publicId);
                
            }
            const attachment = new Attachment();
            attachment.fileName = file.originalname;
            attachment.filePath = file.path;
            attachment.publicId = file.filename;
            attachment.card = isExistedCard;
            await CardRepository.updateAttachment( attachmentId, attachment );
            return new Result( true, 200, "Update attachment successful" );
        } catch (error) {
            throw error;
        }
    }

    async addTodoList( listId : number, cardId : number, todolistBody : TodoListBody ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const newTodoList = new TodoList();
            newTodoList.card = isExistedCard;
            newTodoList.todolistName = todolistBody.todoListName;
            newTodoList.isDone = false;
            await CardRepository.addTodoList( newTodoList );
            return new Result( true, 201, "Create todo list successful" );
        } catch (error) {
            throw error;
        }
    }

    async getAllTodoLists( listId : number, cardId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const todoLists = await CardRepository.getTodoListsByCardId( cardId );
            if (!todoLists) {
                throw new notFoundError("Todo lists not found");
            }
            return new Result( true, 200, "Get todo lists successful", todoLists );
        } catch (error) {
            throw error;
        }
    }

    async getTodoListById( listId : number, cardId : number, todolistId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const todoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!todoList) {
                throw new notFoundError("Todo list not found");
            }
            return new Result( true, 200, "Get todo list successful", todoList );
        } catch (error) {
            throw error;
        }
    }

    async updateTodoList( listId : number, cardId : number, todolistId : number, todoList : Partial<TodoList> ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            await CardRepository.updateTodoList( todolistId, todoList );
            return new Result( true, 200, "Update todo list successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteTodoList( listId : number, cardId : number, todolistId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            await CardRepository.deleteTodoList( todolistId );
            return new Result( true, 200, "Delete todo list successful" );
        } catch (error) {
            throw error;
        }
    }

    async addTodo( listId : number, cardId : number, todolistId : number, todoBody : TodoBody ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const newTodo = new Todo();
            newTodo.todoName = todoBody.todoName;
            newTodo.isDone = false;
            newTodo.todoList = isExistedTodoList;
            await CardRepository.addTodo( newTodo );
            return new Result( true, 201, "Create todo successful" );
        } catch (error) {
            throw error;
        }
    }

    async getTodosByTodoListId( listId : number, cardId : number, todolistId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const todos = await CardRepository.getTodosByTodoListId( todolistId );
            if (!todos) {
                throw new notFoundError("Todos not found");
            }
            return new Result( true, 200, "Get todos successful", todos );
        } catch (error) {
            throw error;
        }
    }

    async getTodoById( listId : number, cardId : number, todolistId : number, todoId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const todo = await CardRepository.getTodoById( todolistId, todoId );
            if (!todo) {
                throw new notFoundError("Todo not found");
            }
            return new Result( true, 200, "Get todo successful", todo );
        } catch (error) {
            throw error;
        }
    }

    async updateTodo( listId : number, cardId : number, todolistId : number, todoId : number, todoBody : TodoBody ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const isExistedTodo = await CardRepository.getTodoById( todolistId, todoId );
            if (!isExistedTodo) {
                throw new notFoundError("Todo not found");
            }
            const updateTodo = new Todo();
            updateTodo.todoName = todoBody.todoName;
            updateTodo.isDone = isExistedTodo.isDone;
            updateTodo.todoList = isExistedTodoList;
            await CardRepository.updateTodo( todoId, updateTodo );
            return new Result( true, 200, "Update todo successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteTodo( listId : number, cardId : number, todolistId : number, todoId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const isExistedTodo = await CardRepository.getTodoById( todolistId, todoId );
            if (!isExistedTodo) {
                throw new notFoundError("Todo not found");
            }
            await CardRepository.deleteTodo( todoId );
            return new Result( true, 200, "Delete todo successful" );
        } catch (error) {
            throw error;
        }
    }

    async checkTodo( listId : number, cardId : number, todolistId : number, todoId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedTodoList = await CardRepository.getTodoListById( cardId, todolistId );
            if (!isExistedTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const isExistedTodo = await CardRepository.getTodoById( todolistId, todoId );
            if (!isExistedTodo) {
                throw new notFoundError("Todo not found");
            }
            const updateTodo = new Todo();
            updateTodo.todoName = isExistedTodo.todoName;
            updateTodo.isDone = !isExistedTodo.isDone;
            updateTodo.todoList = isExistedTodoList;
            await CardRepository.updateTodo( todoId, updateTodo );
            const checkTodoList = await CardRepository.getTodosByTodoListId( todolistId );
            if (!checkTodoList) {
                throw new notFoundError("Todo list not found");
            }
            const isDone = checkTodoList.some( (todo) => todo.isDone === true );
            updateTodo.isDone = isDone;
            await CardRepository.updateTodoList( todolistId, updateTodo );
            return new Result( true, 200, "Check todo successful" );
        } catch (error) {
            throw error;
        }
    }

    async addComment( listId : number, cardId : number, comment : CommentBody ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const newComment = new Comment();
            newComment.comment = comment.comment;
            newComment.card = isExistedCard;
            await CardRepository.addComment( newComment );
            return new Result( true, 201, "Create comment successful" );
        } catch (error) {
            throw error;
        }
    }

    async getCommentsByCardId( listId : number, cardId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const comments = await CardRepository.getCommentsByCardId( cardId );
            if (!comments) {
                throw new notFoundError("Comments not found");
            }
            return new Result( true, 200, "Get comments successful", comments );
        } catch (error) {
            throw error;
        }
    }

    async getCommentById( listId : number, cardId : number, commentId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const comment = await CardRepository.getCommentById( cardId, commentId );
            if (!comment) {
                throw new notFoundError("Comment not found");
            }
            return new Result( true, 200, "Get comment successful", comment );
        } catch (error) {
            throw error;
        }
    }

    async updateComment( listId : number, cardId : number, commentId : number, comment : Partial<CommentBody> ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedComment = await CardRepository.getCommentById( cardId, commentId );
            if (!isExistedComment) {
                throw new notFoundError("Comment not found");
            }
            await CardRepository.updateComment( commentId, comment );
            return new Result( true, 200, "Update comment successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteComment( listId : number, cardId : number, commentId : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( listId, cardId );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            const isExistedComment = await CardRepository.getCommentById( cardId, commentId );
            if (!isExistedComment) {
                throw new notFoundError("Comment not found");
            }
            await CardRepository.deleteComment( commentId );
            return new Result( true, 200, "Delete comment successful" );
        } catch (error) {
            throw error;
        }
    }
}

export default new CardService();
