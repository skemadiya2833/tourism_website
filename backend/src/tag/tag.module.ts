import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]), AuthModule
  ],
  providers: [TagService],
  controllers: [TagController],
  exports: [TagModule],  
})
export class TagModule {}
