import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { EntityType } from 'src/types/entityType.enum';

export class SearchQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsEnum(EntityType)
  @IsOptional()
  entityType: EntityType;

  @IsOptional()
  @IsNumber()
  hotelStarRating?: number;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  placeId?: string;

  @IsOptional()
  tagIds?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'hotelStarRating' | 'name';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
