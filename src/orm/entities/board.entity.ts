import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";
import { WorkSpace } from "./workspace.entity";
import { List } from "./list.entity";
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

    @OneToMany( () => List, (List) => List.board )
    lists! : List[]

}