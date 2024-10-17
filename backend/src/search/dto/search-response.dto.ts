interface BaseEntity {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
}

export interface PlaceResponse extends BaseEntity {
  entityType: 'PLACE';
}

export interface HeritageResponse extends BaseEntity {
  entityType: 'HERITAGE';
  tags?: string[];
}

export interface HotelResponse extends BaseEntity {
  entityType: 'HOTEL';
  hotelStarRating?: number;
  price?: number;
}

export type EntityResponse = PlaceResponse | HeritageResponse | HotelResponse;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchAllResponse 
    extends PaginatedResponse<EntityResponse> {}

export interface SearchPlacesResponse
  extends PaginatedResponse<PlaceResponse> {}

export interface SearchHeritagesResponse
  extends PaginatedResponse<HeritageResponse> {}

export interface SearchHotelsResponse
  extends PaginatedResponse<HotelResponse> {}
