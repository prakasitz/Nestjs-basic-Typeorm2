import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HobbyDocument = Hobby & Document;

@Schema()
export class Hobby {
    @Prop()
    username: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    age: number

    @Prop()
    profile: [];

    @Prop([String])
    str_list: string[]

    @Prop()
    hobbys: []
}

export const HobbySchema = SchemaFactory.createForClass(Hobby);