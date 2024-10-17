import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHeritageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  tags: string;
  
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsOptional()
  @IsString()
  mapUrl:string;
}
