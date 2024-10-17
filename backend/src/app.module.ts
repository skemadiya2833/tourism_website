import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { HeritageModule } from './heritage/heritage.module';
import { TagModule } from './tag/tag.module';
import { PlaceModule } from './place/place.module';
import { HotelModule } from './hotel/hotel.module';
import { ImageModule } from './image/image.module';
import { QueryModule } from './query/query.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SearchModule } from './search/search.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tourism',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
    UserModule,
    PlaceModule,
    HeritageModule,
    TagModule,
    HotelModule,
    ImageModule,
    QueryModule,
    AuthModule,
    SearchModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
