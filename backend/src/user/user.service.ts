import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { email, isDeleted: false } });
      if (!user) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, isDeleted: false } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
