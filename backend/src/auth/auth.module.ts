import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; // استيراد UserModule
import * as dotenv from 'dotenv';
import { SharedModule } from 'src/shared/shared.module';
import { RateLimitMiddleware } from 'src/middleware/rate-limit.middleware';
dotenv.config();

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
