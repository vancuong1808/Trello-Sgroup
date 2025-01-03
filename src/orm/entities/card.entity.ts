import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { List } from "./list.entity"
import { Attachment } from "./attachment.entity"
import { Comment } from "./comment.entity"
import { TodoList } from "./todolist.entity"
import { User } from "./user.entity"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    cardName! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => List, (List) => List.cards, { onDelete: "CASCADE" })
    list! : List

    @OneToMany( () => Attachment, (Attachment) => Attachment.card )
    attachments! : Attachment[]

    @OneToMany( () => Comment, (Comment) => Comment.card )
    comments! : Comment[]

    @OneToMany( () => TodoList, (TodoList) => TodoList.card )
    todolists! : TodoList[]

    @ManyToMany( () => User, (User) => User.cards )
    @JoinTable({
        name : "user_cards"
    })
    users! : User[]
}
