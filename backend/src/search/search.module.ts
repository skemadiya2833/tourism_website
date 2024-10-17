// src/search/search.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Place } from 'src/place/place.entity';
import { Heritage } from 'src/heritage/heritage.entity';
import { Hotel } from 'src/hotel/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Heritage, Hotel]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
