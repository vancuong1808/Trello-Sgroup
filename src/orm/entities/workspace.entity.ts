import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,  OneToMany, ManyToMany} from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";
@Entity()
export class WorkSpace {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    workspaceName! : string
    
    @Column({ type : "varchar", length : 100 })
    createdBy! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToMany( () => User, (User) => User.workspaces )
    users! : User[]

    @OneToMany( () => Board, (Board) => Board.workspace )
    boards! : Board[]
}
