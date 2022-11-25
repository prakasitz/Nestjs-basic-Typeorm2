import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz')

export class Quiz extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: 'The quiz unique identifier',
    })
    id: number;

    @Column({
        type: 'nvarchar',
    })
    title: string;

    @Column({
        type: 'nvarchar',
    })
    description: string;

    @Column({
        type: 'datetime',
    })
    created_date: string;

    @Column()
    isActive: number;

}
