import { Controller, Get, Req } from '@nestjs/common';
import { AuthRequest } from 'src/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from 'src/utils/jwt';

@Controller()
export class UserController {
  constructor(private readonly jwtService: JwtService) {}
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    const token = generateToken(this.jwtService, {
      userId: req.user?._id as string,
    });
    return {
      user: req.user,
      token,
    };
  }
}
