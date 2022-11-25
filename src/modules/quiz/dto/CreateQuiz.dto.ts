import { IsEnum, IsNotEmpty, Length } from "class-validator";

export class createQuizDto {
    @IsNotEmpty({message: 'The quiz should have a tile'})
    @Length(3, 255)
    title: string;

    @IsNotEmpty()
    @Length(3, 255)
    description: string;

    @IsEnum([0,1])
    isActive: number
}