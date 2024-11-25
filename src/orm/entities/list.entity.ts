import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Board } from "./board.entity"
import { Card } from "./card.entity"

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    listName! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => Board, (Board) => Board.lists, { onDelete: "CASCADE" })
    board! : Board

    @OneToMany( () => Card, (Card) => Card.list )
    cards! : Card[]
}
