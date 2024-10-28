import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, DeleteDateColumn } from "typeorm";
import { Board } from "./board.entity";
import { Card } from "./card.entity"

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

    @ManyToOne( () => Board, (Board) => Board.lists )
    board! : Board

    @OneToMany( () => Card, (Card) => Card.list )
    cards! : Card[]
}