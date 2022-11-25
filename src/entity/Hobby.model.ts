import { IsDefined, IsInt } from "class-validator"
import { ObjectId } from "mongoose"
import { Column } from "typeorm"

export class Hobbys {
    @Column()
    id: ObjectId

    @Column()
    @IsDefined()
    name: string

    @Column()
    @IsDefined()
    @IsInt()
    frequency: number

    @Column()
    createDate: Date

    @Column()
    updateDate: Date
}