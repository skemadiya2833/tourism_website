import { IsEnum, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { EntityType } from '../types/entityType.enum';
import { Place } from 'src/place/place.entity';
import { Heritage } from 'src/heritage/heritage.entity';
import { Hotel } from 'src/hotel/hotel.entity';

export class CreateImageDto {
  @IsEnum(EntityType)
  @IsNotEmpty()
  entityType: EntityType;

  @IsString()
  @IsNotEmpty()
  entityId: string;
}
