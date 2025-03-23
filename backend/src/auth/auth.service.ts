import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { generateToken } from '../utils/jwt';
import { User } from '../user/schemas/user.schema';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly appLogger: AppLogger,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, '_id' | 'name' | 'email'> | null> {
    const user = await this.userService.findOne(email);
    console.log(user, user?.password);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        this.appLogger.warn(
          `Signin failed - Incorrect password: ${email}`,
          'AuthService',
        );
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password: pass, ...result } = user.toObject();
      return result;
    }
    this.appLogger.warn(
      `Signin failed - User not found: ${email}`,
      'AuthService',
    );
    return null;
  }

  genToken(payload: any) {
    return generateToken(this.jwtService, payload);
  }

  async register(
    newUser: CreateUserDto,
  ): Promise<Pick<User, '_id' | 'name' | 'email'>> {
    const existingUser = await this.userService.findOne(newUser.email);
    if (existingUser) {
      this.appLogger.warn(
        `Signup failed: Email ${newUser.email} already exists`,
      );
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const user = await this.userService.create({
      email: newUser.email,
      name: newUser.name,
      password: hashedPassword,
    });
    const { password, ...result } = user.toObject();
    return result;
  }
}
