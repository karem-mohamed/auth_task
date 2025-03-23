import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger/logger.module';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    LoggerModule,
  ],
  exports: [JwtModule, LoggerModule],
})
export class SharedModule {}
