import { PartialType } from '@nestjs/swagger';
import { CreateHeritageDto } from './create-heritage.dto';

export class UpdateHeritageDto extends PartialType(CreateHeritageDto) {}
