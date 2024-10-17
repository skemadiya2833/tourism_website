import { IsNotEmpty, IsString, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../types/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only alphabets' })
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }
  )
  password: string;

  @IsOptional()
  @IsEnum(Role, { each: true, message: 'Invalid role' })
  role?: Role;
}
