import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quize.entity";

@Entity('pinsuay2')
export class Pinsuay2 extends Quiz {
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
    isActive: boolean;

}
