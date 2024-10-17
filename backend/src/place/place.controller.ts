import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  BadRequestException,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/roles.decorator';
import { GetPlaceDto } from './dto/get-place.dto';
import { Place } from './place.entity';
import { PlaceResponseDto, PlacesResponseDto } from './dto/place-response.dto';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  async getAllPlaces(@Query() query: GetPlaceDto): Promise<PlacesResponseDto> {
    const placesWithImages = await this.placeService.findAll(query);

    if (query.name) {
      return placesWithImages;
    }
    console.log(' this is controller of place ', placesWithImages);
    return placesWithImages;
  }

  @Get(':id')
  async getPlaceById(@Param('id') id: string): Promise<PlaceResponseDto> {
    const place = await this.placeService.findPlaceByIdWithImages(id);
    return place;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images' },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  async createPlace(
    @Body() createPlaceDto: CreatePlaceDto,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; thumbnail: Express.Multer.File[] },
  ): Promise<Place> {
    if (!files.thumbnail) {
      throw new BadRequestException('Thumbnail is required');
    }

    const place = await this.placeService.createPlace(createPlaceDto, files);
    return place;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FileFieldsInterceptor([{ name: 'thumbnail', maxCount: 1 }]))
  @Patch(':id')
  async updatePlace(
    @Param('id') id: string,
    updatePlaceDto: UpdatePlaceDto,
    @UploadedFiles()
    files: { thumbnail: Express.Multer.File[] },
  ): Promise<Place> {
    const updatedPlace = await this.placeService.updatePlace(
      id,
      updatePlaceDto,
      files.thumbnail,
    );
    return updatedPlace;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Delete(':id')
  async deletePlace(@Param('id') id: string) {
    await this.placeService.deletePlace(id);
    return {
      message: 'Place and associated images deleted successfully',
    };
  }
}
