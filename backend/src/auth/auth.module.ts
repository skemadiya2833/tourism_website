import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from 'src/auth/auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),  
    JwtModule.register({
      secret: 'secretkey', 
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [
    AuthService, 
    JwtStrategy, 
    AuthGuard,  
  ],
  controllers: [AuthController],
  exports: [
    AuthService, 
    AuthGuard, 
    JwtModule,  
  ],
})
export class AuthModule {}
