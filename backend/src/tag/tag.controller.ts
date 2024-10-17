import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { TagResponseDto } from './dto/tags-response.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
      const tag = await this.tagService.create(createTagDto);
      return tag;
  }

  @Get()
  async findAll():Promise<TagResponseDto> {
    try {
      const tags = await this.tagService.findAll();
      return {
        data: tags,
      };
    } catch (error) {
      throw new BadRequestException('Error fetching tags');
    }
  }

  @Get(':id')
  async findByIds(@Param('id') id: string) {
    try {
      const tag = await this.tagService.findById(id);

      return {
        data: tag,
      };
    } catch (error) {
      throw new BadRequestException('Error fetching place details');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.tagService.remove(id);
      return {
        statusCode: 200,
        message: 'Tag deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException('Error deleting tag');
    }
  }
}
