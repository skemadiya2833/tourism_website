import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { QueryStatus } from './query.entity';

export class CreateQueryDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    message: string;
  
    @IsOptional()
    @IsEnum(QueryStatus)
    status: QueryStatus;

    @IsNotEmpty()
    @IsNumber()
    userId : number;
}
