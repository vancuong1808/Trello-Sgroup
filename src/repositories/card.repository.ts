import { mysqlSource } from '../configs/data-source.config.ts';
import { Attachment } from '../orm/entities/attachment.entity';
import { Card } from '../orm/entities/card.entity';
import { Todo } from '../orm/entities/todo.entity.ts';
import { TodoList } from '../orm/entities/todolist.entity.ts';
import { Comment } from '../orm/entities/comment.entity.ts';

class CardRepository {
    private readonly cardRepository = mysqlSource.getRepository(Card);
    private readonly attachmentRepository = mysqlSource.getRepository(Attachment);
    private readonly todoListRepository = mysqlSource.getRepository(TodoList);
    private readonly todoRepository = mysqlSource.getRepository(Todo);
    private readonly commentRepository = mysqlSource.getRepository(Comment);

    async getAllcards( listId :  number ): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            order : {
                id : "asc"
            },
            where : {
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return cards;
    }

    async getCardById( listId : number, cardId : number ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                id : cardId,
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card
    }

    async getCardByName( listId : number, name : string ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                cardName : name,
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card;
    }

    async addCard( card : Card ): Promise<Card | null> {
        const newCard =  this.cardRepository.create( card );
        await this.cardRepository.save( newCard );
        return newCard;
    }

    async updateCard( cardId : number, card : Partial<Card> ): Promise<void> {
        await this.cardRepository.update( cardId, card );
    }

    async deleteCard( cardId : number ): Promise<void> {
        await this.cardRepository.delete( cardId );
    }

    async getCardsByListId( listId : number ): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            relations : ["board"],
            where : {
                list : {
                    id : listId
                }
            }
        });
        return cards;
    }

    async addAttachment(  attachment : Attachment ): Promise<Attachment | null> {
        const newAttachment = this.attachmentRepository.create( attachment );
        await this.attachmentRepository.save( newAttachment );
        return newAttachment;
    }

    async getAttachmentById( cardId : number, attachmentId : number ): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findOne({
            select : ["id", "fileName", "filePath", "publicId"],
            where : {
                id : attachmentId,
                card : {
                    id : cardId
                }
            },
            relations : ["card"]
        });
        return attachment;
    }

    async getAttachmentByPublicId( publicId : string ): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findOne({
            select : ["id", "fileName", "filePath", "publicId"],
            where : {
                publicId : publicId
            },
            relations : ["card"]
        });
        return attachment;
    }

    async deleteAttachment( attachmentId : number ): Promise<void> {
        await this.attachmentRepository.delete( attachmentId );
    }

    async updateAttachment( attachmentId : number, attachment : Partial<Attachment> ): Promise<void> {
        await this.attachmentRepository.update( attachmentId, attachment );
    }

    async addTodoList( todoList : TodoList ): Promise<TodoList | null> {
        const newTodoList = this.todoListRepository.create( todoList );
        await this.todoListRepository.save( newTodoList );
        return newTodoList;
    }

    async getTodoListsByCardId( cardId : number ): Promise<TodoList[] | null> {
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

    async getTodoListById( cardId : number, todoListId : number ): Promise<TodoList | null> {
        const todoList = await this.todoListRepository.findOne({
            select : ["id", "todolistName", "isDone"],
            where : {
                id : todoListId,
                card : {
                    id : cardId
                }
            },
            relations : ["card", "todos"]
        });
        return todoList;
    }

    async getTodoListByName( cardId : number, name : string ): Promise<TodoList | null> {
        const todoList = await this.todoListRepository.findOne({
            select : ["id", "todolistName", "isDone"],
            where : {
                todolistName : name,
                card : {
                    id : cardId
                }
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

    async addTodo( todo : Todo ): Promise<Todo | null> {
        const newTodo = this.todoRepository.create( todo );
        await this.todoRepository.save( newTodo );
        return newTodo;
    }

    async getTodosByTodoListId( todoListId : number ): Promise<Todo[] | null> {
        const todos = await this.todoRepository.find({
            select : ["id", "todoName", "isDone"],
            where : {
                todoList : {
                    id : todoListId
                }
            },
            relations : ["todoList"]
        });
        return todos;
    }

    async getTodoById( todoListId : number, todoId : number ): Promise<Todo | null> {
        const todo = await this.todoRepository.findOne({
            select : ["id", "todoName", "isDone"],
            where : {
                id : todoId,
                todoList : {
                    id : todoListId
                }
            },
            relations : ["todoList"]
        });
        return todo;
    }

    async getTodoByName( todoListId : number, name : string ): Promise<Todo | null> {
        const todo = await this.todoRepository.findOne({
            select : ["id", "todoName", "isDone"],
            where : {
                todoName : name,
                todoList : {
                    id : todoListId
                }
            },
            relations : ["todoList"]
        });
        return todo;
    }

    async updateTodo( todoId : number, todo : Partial<Todo> ): Promise<void> {
        await this.todoRepository.update( todoId, todo );
    }

    async deleteTodo( todoId : number ): Promise<void> {
        await this.todoRepository.delete( todoId );
    }

    async addComment( comment : Comment ): Promise<Comment | null> {
        const newComment = this.commentRepository.create( comment );
        await this.commentRepository.save( newComment );
        return newComment;
    }

    async getCommentsByCardId( cardId : number ): Promise<Comment[] | null> {
        const comments = await this.commentRepository.find({
            select : ["id", "comment"],
            where : {
                card : {
                    id : cardId
                }
            },
            relations : ["card"]
        });
        return comments;
    }

    async getCommentById( cardId : number, commentId : number ): Promise<Comment | null> {
        const comment = await this.commentRepository.findOne({
            select : ["id", "comment"],
            where : {
                id : commentId,
                card : {
                    id : cardId
                }
            },
            relations : ["card"]
        });
        return comment;
    }

    async updateComment( commentId : number, comment : Partial<Comment> ): Promise<void> {
        await this.commentRepository.update( commentId, comment );
    }

    async deleteComment( commentId : number ): Promise<void> {
        await this.commentRepository.delete( commentId );
    }
}

export default new CardRepository();
