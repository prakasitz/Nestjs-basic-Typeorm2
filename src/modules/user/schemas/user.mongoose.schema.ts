import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({collection: "user"})
export class User {
    @Prop()
    username: string

    @Prop()
    firstName: string

    @Prop({
        required: [true, "hello"]
    }) 
    lastName: string

    @Prop()
    @IsNumber()
    age: number

    @Prop()
    profile: [];

    @Prop([String])
    str_list: string[]

    @Prop()
    hobbys: []
}

export const UserSchema = SchemaFactory.createForClass(User);