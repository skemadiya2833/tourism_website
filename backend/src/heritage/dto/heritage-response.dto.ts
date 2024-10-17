import { BaseEntityResponse } from 'src/common/dto/base-entity-response.dto';
import { Place } from 'src/common/dto/place.dto';

export interface HeritageResponseDto extends BaseEntityResponse {
  
  tags: string[];
  placeId: string;
  place: Place;
}

export interface HeritagesResponseDto extends PaginationResponse {
  data: HeritageResponseDto[];
}
