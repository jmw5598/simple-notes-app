import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggerModule } from './logger/logger.module';
import { PlansModule } from './plans/plans.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';

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
    DocumentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
