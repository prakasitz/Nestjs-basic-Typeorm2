import { ArrayMinSize, IsArray, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Length, MinLength, ValidateNested } from "class-validator";
import { Hobbys } from "src/entity/Hobby.model";
import { Profile } from "src/entity/Profile.model";


export class createUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    // @IsNotEmpty()
    // @IsString()
    // lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ValidateNested({
        message: "hellosss"
    })
    profile: Profile;

    @IsArray()
    @IsString({each: true})
    str_list: string[]

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    hobbys: Hobbys[];
}