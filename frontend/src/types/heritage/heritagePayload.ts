import { BaseEntity } from '../common/baseEntity';
import { PaginationResponse } from '../common/pagination';
import { Place } from '../common/place';

export interface Heritage extends BaseEntity {
  tags: number[];
  placeId: string;
  place: Place;
}

export interface HeritagesPayload extends PaginationResponse {
  data: Heritage[];
}
