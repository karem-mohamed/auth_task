import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AppLogger } from 'src/logger/logger.service';

export interface AuthRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly applogger: AppLogger,
  ) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.applogger.error('No token provided');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findByID(decoded.userId);

      if (!user) {
        this.applogger.error('Invalid token: user not found');
        throw new UnauthorizedException('Invalid token: user not found');
      }
      const { password, ...userData } = user.toObject();
      req.user = userData;
      next();
    } catch (error) {
      this.applogger.error('Invalid or expired token');
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
