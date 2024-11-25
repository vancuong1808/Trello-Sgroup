import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from "typeorm";
import { TodoList } from "./todolist.entity"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    todoName! : string

    @Column({ type : "boolean"})
    isDone! : boolean

    @CreateDateColumn()
    createdAt! : Date
    
    @ManyToOne( () => TodoList, (TodoList) => TodoList.todos, { onDelete: "CASCADE" })
    todoList! : TodoList
}
