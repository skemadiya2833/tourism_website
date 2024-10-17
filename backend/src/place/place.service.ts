import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ImageService } from '../image/image.service';
import { EntityType } from 'src/types/entityType.enum';
import { GetPlaceDto } from './dto/get-place.dto';
import { PlaceResponseDto, PlacesResponseDto } from './dto/place-response.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly imageService: ImageService,
    @InjectDataSource() private readonly datasource: DataSource,
  ) {}

  async findPlaceByIdWithImages(id: string): Promise<PlaceResponseDto> {
    const place = await this.datasource.query(
      `SELECT p.*,
              (SELECT JSON_ARRAYAGG(
                          JSON_OBJECT('link', img.imageLink, 'id', img.id)
                      )
               FROM image img 
               WHERE img.entityId = p.id 
               AND img.entityType = 'PLACE'
               AND img.isDeleted = false
              ) AS images
       FROM place p
       WHERE p.id = ? AND p.isDeleted = false`,
      [id],
    );

    if (!place.length) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    return place[0];
  }

  //Find place without images
  async findPlaceDetailsById(id: string): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!place) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }

    return place;
  }

  async findAll(query: GetPlaceDto): Promise<PlacesResponseDto> {
    const { page, limit, name, keyword } = query;
    const pageNumber = Math.max(1, page);
    const pageSize = Math.max(1, limit);
    const offset = (pageNumber - 1) * pageSize;

    if (name) {
      const placesName = await this.datasource.query(
        `SELECT p.id as id , p.name as name
         FROM place p
         WHERE p.isDeleted = false`,
      );
      return placesName;
    }

    const places = await this.datasource.query(
      `SELECT p.*, 
              CONCAT('[', GROUP_CONCAT(
                  JSON_OBJECT('link', img.imageLink, 'id', img.id) 
                  ORDER BY img.imageLink ASC
              ), ']') as images
       FROM place p
       LEFT JOIN image img 
       ON p.id = img.entityId 
       AND img.entityType = 'PLACE' 
       AND img.isDeleted = false
       WHERE p.isDeleted = false
        ${keyword ? `AND p.name LIKE '%${keyword}%'` : ''}
       GROUP BY p.id
       ORDER BY p.id
       LIMIT ? OFFSET ?`,
      [pageSize, offset],
    );

    console.log('After mapping', places);
    const totalCount = await this.placeRepository.count({
      where: {
        isDeleted: false,
        ...(keyword ? { name: Like(`%${keyword}%`) } : {}),
      },
    });

    console.log('Total count', totalCount);
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: places,
      totalCount,
      totalPages,
      limit,
    };
  }

  async createPlace(
    createPlaceDto: CreatePlaceDto,
    files: { images?: Express.Multer.File[]; thumbnail: Express.Multer.File[] },
  ): Promise<Place> {
    const { images, thumbnail } = files;

    const place = this.placeRepository.create(createPlaceDto);

    const savedPlace = await this.placeRepository.save(place);

    place.thumbnailUrl = await this.imageService.handleThumbnailUpload(
      savedPlace.id,
      EntityType.PLACE,
      thumbnail,
    );

    await this.imageService.handleImagesUpload(
      savedPlace.id,
      EntityType.PLACE,
      images,
    );
    return await this.placeRepository.save(place);
  }

  async updatePlace(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
    thumbnail: Express.Multer.File[],
  ): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    if (thumbnail) {
      await this.imageService.deleteImageByUrl(place.thumbnailUrl);

      place.thumbnailUrl = await this.imageService.handleThumbnailUpload(
        place.id,
        EntityType.PLACE,
        thumbnail,
      );
    }

    Object.assign(place, updatePlaceDto);

    return await this.placeRepository.save(place);
  }

  async deletePlace(id: string): Promise<void> {
    const place = await this.placeRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!place) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }

    try {
      await this.imageService.deleteImagesByEntity(id, EntityType.PLACE);
      place.isDeleted = true;
      await this.placeRepository.save(place);
    } catch (error) {
      throw new BadRequestException(
        'Error deleting place or associated images',
      );
    }
  }
}
