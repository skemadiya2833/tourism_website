import { EntityType } from "../enum/entityType.enum";

export enum SearchEntityType {
  ALL = "ALL",
  HERITAGE = "HERITAGE",
  HOTEL = "HOTEL",
}

export interface SearchQueryDto {
  keyword?: string;
  entityType: SearchEntityType;
  placeId?: string;
  hotelStarRating?: number;
  minPrice?: number;
  maxPrice?: number;
  tagIds?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface SearchResponseItem {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  entity: EntityType;
}

export interface PlaceResponse extends SearchResponseItem {}

export interface HeritageResponse extends SearchResponseItem {
  tags: string[];
}

export interface HotelResponse extends SearchResponseItem {
  hotelStarRating: number;
  price: number;
}

export interface SearchAllResponse {
  data: SearchResponseItem[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchPlacesResponse {
  data: PlaceResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchHeritagesResponse {
  data: HeritageResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchHotelsResponse {
  data: HotelResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchSuccessPayload {
  entityType: SearchEntityType;
  results: SearchAllResponse;
}
