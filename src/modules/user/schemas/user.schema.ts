import { User } from 'src/entity/user.entity';
import { EntitySchema, ObjectID, ObjectIdColumn } from 'typeorm';


export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        username: {
            type: String
        },
        firstName: {
            type: String

        },
        lastName: {
            type: String

        },
        age: {
            type: Number
        },
        str_list: {
            type: 'array'
        }

    }
})