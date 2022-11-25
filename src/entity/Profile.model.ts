import { IsDefined, IsNotEmpty } from "class-validator"
import { Column } from "typeorm"

export class Profile {
    @Column()
    @IsDefined()
    about: string

    @Column()
    @IsDefined()
    education: string

    @Column()
    @IsDefined()
    career: string
}
