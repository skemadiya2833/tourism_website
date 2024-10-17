import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetHotelDto {
    @IsOptional()
    ownerId: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number ;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsString()
    sortBy?: "price" | "hotelStarRating" | "name";

    @IsOptional()
    sortOrder?: "ASC" | "DESC";

    @IsString()
    keyword?: string;
}
