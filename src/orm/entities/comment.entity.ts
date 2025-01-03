import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Card } from "./card.entity"
import { User } from "./user.entity"
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100, nullable : true })
    comment! : string

    @CreateDateColumn()
    createdAt! : Date

    @UpdateDateColumn()
    updatedAt! : Date
   
    @ManyToOne( () => Card, (Card) => Card.comments, { onDelete: "CASCADE" })
    card! : Card

    @ManyToOne( () => User, (User) => User.comments, { onDelete: "CASCADE" })
    user! : User
}
