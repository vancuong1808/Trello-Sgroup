import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import { WorkSpace } from './workspace.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 100 })
    description! : string

    @CreateDateColumn()
    createdAt! : Date
    
    @UpdateDateColumn()
    updatedAt! : Date
}
