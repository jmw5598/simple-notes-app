import { Module } from '@nestjs/common';
import { SnLoggerService } from './sn-logger.service';

@Module({
  providers: [
    SnLoggerService
  ],
  exports: [
    SnLoggerService
  ]
})
export class LoggerModule {}
