import { BaseEntity } from "../common/baseEntity";
import { PaginationResponse } from "../common/pagination";
export interface Place extends BaseEntity {}

export interface Name {
  id: string;
  name: string;
}

export interface PlacesPayload extends PaginationResponse {
  data: Place[];
}

export interface PlaceNamePayload {
  data: Name[];
}