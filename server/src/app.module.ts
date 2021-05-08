import { Module,  CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggerModule } from './logger/logger.module';
import { PlansModule } from './plans/plans.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { CalendarModule } from './calendar/calendar.module';
import { ThemesModule } from './themes/themes.module';
import { DocumentBuilderModule } from './common/services/document-builder/document-builder.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    PlansModule,
    TopicsModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    DocumentsModule,
    CalendarModule,
    ThemesModule,
    DocumentBuilderModule,
    CacheModule.register()
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
