import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from './heritage.entity';
import { HeritageService } from './heritage.service';
import { HeritageController } from './heritage.controller';
import { TagModule } from '../tag/tag.module';  
import { PlaceModule } from 'src/place/place.module';
import { ImageModule } from 'src/image/image.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Heritage]),
    TagModule, PlaceModule, ImageModule, AuthModule
  ],
  providers: [HeritageService],
  controllers: [HeritageController],
  exports: [HeritageModule],  
})
export class HeritageModule {}
