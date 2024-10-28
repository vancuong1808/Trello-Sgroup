import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, ManyToOne, DeleteDateColumn, JoinTable } from "typeorm";
import { Board } from "./board.entity";

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
}