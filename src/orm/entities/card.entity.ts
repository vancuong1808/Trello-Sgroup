import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, ManyToOne, DeleteDateColumn, JoinTable } from "typeorm";
import { List } from "./list.entity";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    cardName! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => List, (List) => List.cards)
    list! : List
}