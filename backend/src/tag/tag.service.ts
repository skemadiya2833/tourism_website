import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name: createTagDto.name },
    });

    if (tag) {
      throw new ConflictException('Tag already exists');
    }
    const createdTag = this.tagRepository.create(createTagDto);

    return this.tagRepository.save(createdTag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findById(id: string) {
    return this.tagRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
