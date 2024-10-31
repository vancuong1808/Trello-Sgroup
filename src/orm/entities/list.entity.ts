import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn } from "typeorm";
import { User } from "./user.entity"
import { Card } from "./card.entity"
import { Notification } from "./notification.entity"
import { File } from "./file.entity"
import { Comment } from "./comment.entity"

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    listName! : string

    @CreateDateColumn()
    createdAt! : Date
    
    @DeleteDateColumn()
    deletedAt! : Date
    
    @ManyToMany( () => User, (User) => User.lists )
    @JoinTable({
        name : "user_lists"
    })
    users! : User[]

    @ManyToOne( () => Card, (Card) => Card.lists )
    card! : Card

    @OneToMany( () => Notification, (Notification) => Notification.list )
    notifications! : Notification[]

    @OneToMany( () => File, (File) => File.list )
    files! : File[]

    @OneToMany( () => Comment, (Comment) => Comment.list )
    comments! : Comment[]
}