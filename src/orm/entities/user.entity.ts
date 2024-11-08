import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany} from "typeorm";
import { WorkSpace } from "./workspace.entity"
import { Role } from "./role.entity"
import { List } from "./list.entity"
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

    @ManyToMany( () => WorkSpace, (WorkSpace) => WorkSpace.users )
    workspaces! : WorkSpace[]

    @ManyToMany( () => Role, (Role) => Role.users )
    roles! : Role[]

    @ManyToMany( () => List, (List) => List.users )
    lists! : List[]

} 
