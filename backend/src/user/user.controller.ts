import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id') 
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findUserById(id);
    return user;
  }
}
