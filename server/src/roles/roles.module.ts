import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../users/entities/role.entity';
import { LoggerModule } from '../logger/logger.module';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Role
    ])
  ],
  controllers: [
    RolesController
  ],
  providers: [
    RolesService
  ]
})
export class RolesModule {}
