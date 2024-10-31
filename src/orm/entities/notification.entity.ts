import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, ManyToOne, DeleteDateColumn, JoinTable } from "typeorm";
import { List } from './list.entity'

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    title! : string

    @Column({ type : "varchar", length : 100 })
    message! : string

    @CreateDateColumn()
    createdAt! : Date

    @ManyToOne( () => List, (List => List.notifications ) )
    list! : List

}