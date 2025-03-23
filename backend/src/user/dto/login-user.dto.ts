import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email or password' })
  email: string;

  @IsString({ message: 'Invalid email or password' })
  @MinLength(8, { message: 'Invalid email or password' })
  password: string;
}
