export interface PaginationResponse {
  totalCount: number;
  totalPages: number;
  limit: number;
}

export interface PaginationRequest {
  page?: number ;
  limit?: number;
}
