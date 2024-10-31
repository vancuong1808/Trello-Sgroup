import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";
import { WorkSpace } from "./workspace.entity";
import { Card } from "./card.entity";
@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    boardName! : string

    @CreateDateColumn()
    createdAt! : Date

    @DeleteDateColumn()
    deletedAt! : Date

    @ManyToOne( () => WorkSpace, (WorkSpace) => WorkSpace.boards )
    workspace! : WorkSpace

    @OneToMany( () => Card, (Card) => Card.board )
    cards! : Card[]
}