import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Card } from "./card.entity"
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
}
