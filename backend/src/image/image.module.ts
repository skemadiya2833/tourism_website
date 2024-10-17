import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuthModule],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
