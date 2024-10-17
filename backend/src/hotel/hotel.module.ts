import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { PlaceModule } from 'src/place/place.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    AuthModule,
    ImageModule,
    PlaceModule,
    UserModule,
  ],
  providers: [HotelService],
  controllers: [HotelController],
  exports: [HotelService],
})
export class HotelModule {}
