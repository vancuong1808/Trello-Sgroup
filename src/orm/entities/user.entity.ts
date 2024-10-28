import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./role.entity"
import { WorkSpace } from "./workspace.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100, unique : true })
    email! : string

    @Column({ type : "varchar", length : 100 })
    password! : string

    @Column({ type : "varchar", length : 100, unique : true })
    username! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToMany( () => Role, (Role) => Role.users )
    roles! : Role[]

    @ManyToMany( () => WorkSpace, (WorkSpace) => WorkSpace.users )
    workspaces! : WorkSpace[]
} 