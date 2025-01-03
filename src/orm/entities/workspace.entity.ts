import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,  OneToMany } from "typeorm";
import { Board } from "./board.entity";
import { Notification } from "./notification.entity"
import { UserWorkSpace } from "./userworkspace.entity";
@Entity()
export class WorkSpace {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    workspaceName! : string
    
    @Column({ type : "varchar", length : 100 })
    owner! : string

    @CreateDateColumn()
    createdAt! : Date

    @OneToMany( () => Board, (Board) => Board.workspace )
    boards! : Board[]

    @OneToMany( () => UserWorkSpace, (UserWorkspace) => UserWorkspace.workspace )
    userWorkspaces! : UserWorkSpace[]
}
