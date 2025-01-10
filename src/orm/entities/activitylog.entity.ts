import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Board } from "./board.entity";
import { WorkSpace } from "./workspace.entity";
@Entity()
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    description! : string

    @ManyToOne( () => User, { onDelete: "CASCADE" } )
    user! : User

    @ManyToOne( () => Board, { onDelete: "CASCADE", nullable : true } )
    board! : Board

    @ManyToOne( () => WorkSpace, { onDelete: "CASCADE" } )
    workspace! : WorkSpace
}