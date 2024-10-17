import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsString() 
  description: string;

  @IsOptional()
  @IsString()
  mapUrl:string;
}
