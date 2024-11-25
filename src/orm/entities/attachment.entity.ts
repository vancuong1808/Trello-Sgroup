import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Card } from "./card.entity";
@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type : "varchar", length : 255})
    fileName! : string

    @Column({ type : "varchar", length : 255})
    filePath! : string

    @Column({ type : "varchar", length : 255, nullable : true })
    publicId? : string

    @CreateDateColumn()
    createdAt! : Date

    @UpdateDateColumn()
    updatedAt! : Date

    @ManyToOne( () => Card, (Card) => Card.attachments, { onDelete: "CASCADE" })
    card! : Card
}
