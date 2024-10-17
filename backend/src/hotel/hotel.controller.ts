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
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { RegistrationStatus } from 'src/types/registrationStatus.enum';
import { GetHotelDto } from './dto/get-hotel.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HotelResponseDto, HotelsResponseDto } from './dto/hotel-response.dto';
import { Hotel } from './hotel.entity';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async findAll(@Query() query: GetHotelDto):Promise<HotelsResponseDto> {
    try {
      const hotels = await this.hotelService.findAll(query);
      return {
        data: hotels.data,
        totalCount: hotels.totalCount,
        totalPages: hotels.totalPages,
        limit: query.limit,
      };
    } catch (error) {
      throw new BadRequestException('Error fetching hotels', error.message);
    }
  }

  @Get('pending')
  async findPending(@Query() query: PaginationDto):Promise<HotelsResponseDto> {
    try {
      const hotels = await this.hotelService.findPending(query);
      return hotels;
    } catch (error) {
      throw new BadRequestException('Error fetching pending hotels');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HotelResponseDto> {
    try {
      const hotel = await this.hotelService.findOne(id);
      return hotel;
    } catch (error) {
      throw new BadRequestException('Error fetching hotel');
    }
  }x

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN', 'PROVIDER'])
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images' },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createHotelDto: Record<string, any>,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; thumbnail: Express.Multer.File[] },
  ):Promise<Hotel> {
    console.log("Entered hotels");
    if (!files.thumbnail) {
      throw new BadRequestException('thumbnail is required');
    }

    const transformedDto = plainToInstance(CreateHotelDto, createHotelDto);
    await validateOrReject(transformedDto);
    console.log("Passed all validations");
    const hotel = await this.hotelService.create(transformedDto, files);
    return hotel;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN', 'PROVIDER'])
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('thumbnail'))
  async update(
    @Param('id') id: string,
    @Body() updateHotelDto: Record<string, any>,
    @UploadedFiles() thumbnail: Express.Multer.File[],
  ):Promise<Hotel> {
    try {
      const transformedDto = plainToInstance(UpdateHotelDto, updateHotelDto);
      await validateOrReject(transformedDto);

      const updatedHotel = await this.hotelService.update(
        id,
        transformedDto,
        thumbnail,
      );
      return updatedHotel;
    } catch (error) {
      throw new BadRequestException('Error updating hotel');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Patch('status/:hotelId')
  async updateStatus(
    @Param('hotelId') hotelId: string,
    @Body('status') status: RegistrationStatus,
  ):Promise<Hotel> {
    try {
      const updatedHotel = await this.hotelService.updateStatus(
        hotelId,
        status,
      );
      return updatedHotel;
    } catch (error) {
      throw new BadRequestException('Error updating hotel status');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN', 'PROVIDER'])
  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    try {
      await this.hotelService.softDelete(id);
      // return {
      //   statusCode: 200,
      //   message: 'Hotel deleted successfully',
      // };
      return;
    } catch (error) {
      throw new BadRequestException('Error deleting hotel');
    }
  }
}
