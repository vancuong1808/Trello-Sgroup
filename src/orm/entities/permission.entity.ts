import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./role.entity"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100, unique : true  })
    permissionName! : string

    @ManyToMany( () => Role, (Role) => Role.permissions )
    @JoinTable({
        name : "role_permissions"
    })
    roles! : Role[]
}