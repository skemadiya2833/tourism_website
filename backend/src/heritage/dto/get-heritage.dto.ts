import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetHeritageDto extends PaginationDto {

    @IsString()
    @IsOptional()
    keyword?: string;
}
