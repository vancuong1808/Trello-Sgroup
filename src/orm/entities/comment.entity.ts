import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { List } from "./list.entity"
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    comment! : string

    @CreateDateColumn()
    createdAt! : Date

    @UpdateDateColumn()
    updatedAt! : Date
   
    @ManyToOne( () => List, (List) => List.comments )
    list! : List
}
