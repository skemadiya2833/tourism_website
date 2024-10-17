import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Image } from './image.entity';
import { CreateImageDto } from './create-image.dto';
import * as streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.config';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Place } from 'src/place/place.entity';
import { Heritage } from 'src/heritage/heritage.entity';
import { Hotel } from 'src/hotel/hotel.entity';
import { EntityType } from 'src/types/entityType.enum';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async getImagesByEntity(entity: Place | Heritage | Hotel): Promise<Image[]> {
    return this.imageRepository.find({
      where: {},
    });
  }
  async uploadImage(
    file: Express.Multer.File,
    createImageDto: CreateImageDto,
  ){
    try {
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `tourism/${createImageDto.entityType}/${createImageDto.entityId ?? 'temp'}`,
          },

          (
            error: UploadApiErrorResponse | null,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      const image = this.imageRepository.create({
        publicID: result.public_id,
        entityType: createImageDto.entityType,
        entityId: createImageDto.entityId,
        imageLink: result.secure_url,
      });
      
      const savedImage = await this.imageRepository.save(image);
     
      console.log(' this is saved image  ', savedImage);
      return savedImage.imageLink;
    } catch (error) {
      Logger.error('Error uploading image to Cloudinary', error);
      throw error;
    }
  }
  async deleteImageByUrl(url: string): Promise<void> {
    try {
      const image = await this.imageRepository.findOne({ where: { imageLink: url } });
      console.log( " image found with image url" , image)
      if (!image) {
        throw new NotFoundException('Image not found');
      }

      image.isDeleted = true;
      await this.imageRepository.save(image);
      
    } catch (error) {
      throw error;
    }
  }

  async deleteImagesByEntity(entityId: string, entityType: EntityType): Promise<void> {
    const images = await this.imageRepository.find({
      where: { entityId, entityType },
    });

    if (images.length === 0) {
      return;
    }

    for (const image of images) {
      image.isDeleted = true;
      await this.imageRepository.save(image);
    }
  }
  async handleThumbnailUpload(
    entityId: string,
    entityType: EntityType,
    thumbnail: Express.Multer.File[],
  ): Promise<string>{

    console.log ( "this is thumbnail upload id " + entityId + "  this is entityType  " + entityType + " this is thumbnail " + thumbnail)
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailFile = thumbnail[0];

      const createThumbnailDto = {
        entityType,
        entityId,
      };

      console.log ( ' this is createThumbnailDto" ' + createThumbnailDto)

      const thumbnailUploadResult = await this.uploadImage(
        thumbnailFile,
        createThumbnailDto,
      );

      console.log( " this is thumbnailUploadResult" , thumbnailUploadResult)
      return thumbnailUploadResult;
    }
  }

  async handleImagesUpload(
    entityId: string,
    entityType: EntityType,
    images: Express.Multer.File[],
  ){
    if (images && images.length > 0) {
      const uploadPromises = images.map((file) => {
        const createImageDto = {
          entityType,
          entityId,
        };
        return this.uploadImage(file, createImageDto);
      });

      await Promise.all(uploadPromises);
    }
  }
}

