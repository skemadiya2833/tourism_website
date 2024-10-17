import { BaseEntityResponse } from 'src/common/dto/base-entity-response.dto';

export interface PlaceResponseDto extends BaseEntityResponse {}

export interface PlacesResponseDto extends PaginationResponse {
  data: PlaceResponseDto[];
}
