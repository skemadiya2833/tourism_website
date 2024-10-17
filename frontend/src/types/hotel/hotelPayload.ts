import { Image } from "../common/image";
import { Place } from "../common/place";
import { PaginationResponse } from "../common/pagination";
import { BaseEntity } from "../common/baseEntity";

interface Owner {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Hotel extends BaseEntity {
  websiteLink: string | null;
  contact: string | null;
  address: string;
  hotelStarRating: number;
  availableRooms: number;
  price: number;
  registrationStatus: string;
  updatedAt: string;
  placeId: string;
  ownerId: string;
  place: Place;
  owner: Owner;
  images: Image[];
}


export interface HotelsPayload extends PaginationResponse {
    data: Hotel[];
  }
  
