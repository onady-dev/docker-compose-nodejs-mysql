import { IsNumber, IsString, Min } from "class-validator";
import { Expose, Type } from "class-transformer";

export class SaveUserDto {
    @IsString()
    public firstName: string;
    @IsString()
    public lastName: string;
    @Type(()=>Number)
    @IsNumber()
    public age: number;
}
