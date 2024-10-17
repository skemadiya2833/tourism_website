import { Image } from './image';

export interface BaseEntity {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  mapUrl: string;
  images: Image[];
  isDeleted: number;
}
