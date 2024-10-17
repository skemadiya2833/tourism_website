import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User])] ,
  providers: [UserService, JwtService],
  exports: [UserService],
  controllers: [UserController],

})
export class UserModule {}
