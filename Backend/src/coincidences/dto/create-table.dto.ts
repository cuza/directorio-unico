import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoincidenceDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsOptional()
    public description: string;

    @IsNotEmpty()
    public defaultValue: any;//Any

   // @IsString()
    public currentValue: any;//Any
}
