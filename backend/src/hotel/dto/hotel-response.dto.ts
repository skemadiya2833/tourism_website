import { ImageDto} from "src/common/dto/image-response.dto";
import { Place } from "src/common/dto/place.dto";

interface Owner {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface HotelResponseDto {
  id: string;
  name: string;
  description: string;
  websiteLink: string | null;
  thumbnailUrl: string | null;
  mapUrl: string | null;
  contact: string | null;
  address: string;
  hotelStarRating: number;
  availableRooms: number;
  price: number;
  registrationStatus: string;
  updatedAt: string;
  isDeleted: number;
  placeId: string;
  ownerId: string;
  place: Place;
  owner: Owner;
  images: ImageDto;
}

export interface HotelsResponseDto extends PaginationResponse {
  data: HotelResponseDto[];
}
