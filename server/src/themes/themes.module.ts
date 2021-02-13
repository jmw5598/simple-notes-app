import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesController } from './controllers/themes.controller';
import { Theme } from './entities/theme.entity';
import { ThemesService } from './services/themes.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([Theme])
  ],
  controllers: [
    ThemesController
  ],
  providers: [
    ThemesService
  ]
})
export class ThemesModule {}
