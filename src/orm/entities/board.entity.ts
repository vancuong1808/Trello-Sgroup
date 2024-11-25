import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { WorkSpace } from "./workspace.entity";
import { List } from "./list.entity";
import { UserBoard } from "./userboard.entity";
@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    boardName! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => WorkSpace, (WorkSpace) => WorkSpace.boards, { onDelete: "CASCADE" })
    workspace! : WorkSpace

    @OneToMany( () => UserBoard, (UserBoard) => UserBoard.board )
    userBoards! : UserBoard[]

    @OneToMany( () => List, (List) => List.board )
    lists! : List[]
}
