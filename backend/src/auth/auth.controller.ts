import { Controller, Post, Body, UseFilters, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AppLogger } from 'src/logger/logger.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly applogger: AppLogger,
  ) {}
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    this.applogger.log(`New signup attempt: ${createUserDto.email}`);
    const newUser = await this.authService.register(createUserDto);
    const token = this.authService.genToken({ userId: newUser._id });
    this.applogger.log(`User created successfully: ${newUser.email}`);
    return {
      user: newUser,
      token,
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }) {
    this.applogger.log(`New login attempt: ${loginUserDto.email}`);
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const token = this.authService.genToken({ userId: user._id });
    this.applogger.log(`User logged In successfully: ${user.email}`);
    return {
      user,
      token,
    };
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
  }
}
