import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Profile & Document;

@Schema()
export class Profile {

    about: string
    
    education: string
    
    career: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);