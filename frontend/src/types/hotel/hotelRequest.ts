import { PaginationRequest } from "../common/pagination";
import { RegistrationStatus } from "../enum/registrationStatus.enum";

export interface HotelRequest {
  name: string;
  description: string;
  websiteLink?: string;
  mapUrl: string;
  hotelStarRating: number;
  address: string;
  contact?: string;
  availableRooms: number;
  price: number;
  placeId: string;
  userId: string;
}

export interface HotelFetchQuery extends PaginationRequest {
  ownerId?: string;
  keyword?: string;
  sortBy?: string ;
  sortOrder?: string
}

export interface UpdateHotelRequest  {
    id: string;
    data: Partial<HotelRequest>;
}


export interface UpdateHotelStatus {
    id: string;
    status: RegistrationStatus;
}