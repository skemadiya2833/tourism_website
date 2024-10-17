import { PaginationRequest } from "../common/pagination";

export interface PlaceRequest extends PaginationRequest{
    name: number;
}