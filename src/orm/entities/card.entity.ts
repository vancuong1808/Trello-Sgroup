import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { Board } from "./board.entity"
import { List } from "./list.entity"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    cardName! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => Board, (Board) => Board.cards)
    board! : Board

    @OneToMany( () => List, (List) => List.card )
    lists! : List[]
}