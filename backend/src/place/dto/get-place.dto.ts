import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetPlaceDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  name: number = 0;

  @IsOptional()
  @IsString()
  keyword?: string;
}
