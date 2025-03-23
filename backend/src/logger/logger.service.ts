import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.json(),
        format.prettyPrint(),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          level: 'error',
          maxFiles: '180d',
        }),
        new DailyRotateFile({
          filename: 'logs/debug-%DATE%.log',
          level: 'debug',
          maxFiles: '180d',
        }),
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info({ message, context });
  }
  error(message: string, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ message, context });
  }
}
