import { ImageDto } from './image-response.dto';

export interface BaseEntityResponse {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  mapUrl: string;
  images: ImageDto[];
  isDeleted: number;
}
