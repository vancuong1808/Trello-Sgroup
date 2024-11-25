import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { Card } from "./card.entity"
import { Todo } from "./todo.entity"

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    todolistName! : string

    @Column({ type : "boolean"})
    isDone! : boolean

    @OneToMany( () => Todo, (Todo) => Todo.todoList )
    todos! : Todo[]

    @CreateDateColumn()
    createdAt! : Date
    
    @ManyToOne( () => Card, (Card) => Card.todolists, { onDelete: "CASCADE" })
    card! : Card
}
