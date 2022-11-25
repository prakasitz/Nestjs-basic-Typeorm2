import { IsDefined, IsInt } from "class-validator"
import { Column } from "typeorm"

export class Hobbys {
    @Column()
    @IsDefined()
    name: string

    @Column()
    @IsDefined()
    @IsInt()
    frequency: number
}