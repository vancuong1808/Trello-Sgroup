import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { WorkSpace } from "./workspace.entity";
import { User } from "./user.entity";
import { Role } from "./role.entity";
@Entity()
export class UserWorkSpace {
    @PrimaryGeneratedColumn()
    id! : number

    @ManyToOne( () => User, { onDelete: "CASCADE" })
    user! : User

    @ManyToOne( () => WorkSpace, { onDelete: "CASCADE" })
    workspace! : WorkSpace

    @ManyToOne( () => Role, { onDelete: "CASCADE" }) 
    role! : Role
}
