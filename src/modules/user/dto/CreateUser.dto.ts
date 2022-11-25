import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, MinLength, ValidateNested } from "class-validator";
import { ObjectId } from "mongodb";
import { Hobbys } from "src/entity/Hobby.model";
import { Profile } from "src/entity/Profile.model";
import { Column, ObjectID, ObjectIdColumn } from "typeorm";

export class hobbyUpdate {
    @Type(() => ObjectId)
    userId: ObjectId;

    @Type(() => hobby)
    hobbys: hobby[]
}

export class hobby {
    
    @Type(() => ObjectId)
    @Column()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    frequency: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    createDate: Date

    @Column()
    @IsDate()
    @Type(() => Date)
    updateDate: Date
}

export class createUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    profile: Profile;

    @IsArray()
    str_list: string[]

    @IsArray()
    hobbys: Hobbys[];
}