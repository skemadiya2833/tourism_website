import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export default class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    )
    password: string;
}