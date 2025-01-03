import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany, ManyToOne} from "typeorm";
import { Role } from "./role.entity"
import { Comment } from "./comment.entity";
import { Card } from "./card.entity";

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

    @OneToMany( () => Comment, (Comment) => Comment.user )
    comments! : Comment[]

    @ManyToMany( () => Card, (Card) => Card.users )
    cards! : Card[]

    @ManyToMany( () => Role, (Role) => Role.users )
    roles! : Role[]

} 
