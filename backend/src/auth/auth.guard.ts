import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; 
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
