import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { Role } from 'src/types/roles.enum';
import { createToken } from 'src/common/utils/auth/createToken.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // try {
      const { username, email, password, role } = registerDto;

      const user = await this.userService.findByEmail(email)

      if (user) {
        throw new ConflictException("User already exists with the same email")
      } 

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.userService.createUser({
        username,
        email,
        password: hashedPassword,
        role: role || Role.PROVIDER,
      });

      const { accessToken, refreshToken} = createToken(newUser, this.jwtService);
      return {
        accessToken, 
        refreshToken,
        id: newUser.id,
      }
    // } catch (error) {
    //   if (error instanceof HttpException)
    //     throw error;
    //   else
    //     throw new InternalServerErrorException('Registration failed');
    // }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userService.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { accessToken, refreshToken} = createToken(user, this.jwtService);
      return {
        accessToken, 
        refreshToken,
        id: user.id,
      }
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'secretkey',
      });

      const user = await this.userService.findUserById(payload.id)
      return createToken(user, this.jwtService);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}