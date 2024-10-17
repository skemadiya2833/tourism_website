
import { Controller, Post, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { setAuthCookies } from 'src/common/utils/auth/setAuthCookies.util';
import { authResponse } from './dto/authResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<authResponse> {
      const { accessToken, refreshToken, id } =
        await this.authService.register(registerDto);

      setAuthCookies(res, accessToken, refreshToken);
      res.status(HttpStatus.CREATED);

      return {id };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<authResponse> {
    try {
      const { accessToken, refreshToken, id } =
        await this.authService.login(loginDto);

      setAuthCookies(res, accessToken, refreshToken);
      res.status(HttpStatus.OK);

      return { id}; 
    } catch (error) {
      console.log('From here', error);
      res.status(error.status);
      return error.response;
    }
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshToken = req.cookies['refreshToken'];

      if (!refreshToken) {
        res.status(HttpStatus.UNAUTHORIZED);
        return { message: 'No refresh token provided' };
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.authService.refreshAccessToken(refreshToken);

      setAuthCookies(res, accessToken, newRefreshToken);
      res.status(HttpStatus.OK);

      return { message: 'Token refreshed successfully' };
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Token refresh failed' };
    }
  }
}