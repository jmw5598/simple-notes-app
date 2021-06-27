import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plan } from './entities/plan.entity';
import { PlansController } from './controllers/plans.controller';
import { PlansService } from './services/plans.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  controllers: [
    PlansController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([Plan])
  ],
  providers: [
    PlansService
  ]
})
export class PlansModule {}
