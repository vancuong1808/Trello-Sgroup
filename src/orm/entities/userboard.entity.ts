import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";
import { Role } from "./role.entity";
@Entity()
export class UserBoard {
    @PrimaryGeneratedColumn()
    id! : number

    @ManyToOne( () => User, { onDelete: "CASCADE" })
    user! : User

    @ManyToOne(() => Board, { onDelete: "CASCADE" })
    board!: Board;

    @ManyToOne( () => Role, { onDelete: "CASCADE" }) 
    role! : Role
}
