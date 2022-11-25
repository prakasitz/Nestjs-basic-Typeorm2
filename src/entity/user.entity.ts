import { hobby } from "src/modules/user/dto/CreateUser.dto";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, OneToOne } from "typeorm";
import {IUser} from "../modules/user/IUser"
import { Hobbys } from "./Hobby.model";
import { Profile } from "./Profile.model";

@Entity('user')
export class User extends BaseEntity  {
    @ObjectIdColumn()
    id: ObjectID
    
    @Column()
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column(() => Profile)
    profile: Profile;

    @Column(() => hobby)
    hobbys: hobby[];

    @Column()
    str_list: string[]
}

