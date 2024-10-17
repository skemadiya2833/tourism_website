import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
export const createToken = (user: User, jwtService: JwtService): Record<string, string> => {
  try {
    const accessTokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const refreshTokenPayload = { id: user.id };

    const accessToken = jwtService.sign(accessTokenPayload, {
      expiresIn: '10m',
    });

    const refreshToken = jwtService.sign(refreshTokenPayload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerErrorException('Failed to create JWT tokens');
  }
};