import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { Permission } from "./permission.entity"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100, unique : true  })
    roleName! : string

    @ManyToMany( () => User, (User) => User.roles )
    @JoinTable({
        name : "user_roles"
    })
    users! : User[]

    @ManyToMany( () => Permission, (Permission) => Permission.roles )
    permissions! : Permission[] 
}