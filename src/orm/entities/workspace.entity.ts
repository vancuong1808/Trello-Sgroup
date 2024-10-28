import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { User } from './user.entity';
import { Board } from "./board.entity";
@Entity()
export class WorkSpace {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    workspaceName! : string
    
    @CreateDateColumn()
    createdAt! : Date

    @ManyToMany( () => User, (User) => User.workspaces )
    @JoinTable({
        name : "user_workspaces"
    })
    users! : User[]

    @OneToMany( () => Board, (Board) => Board.workspace )
    boards! : Board[]
}