import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { Address } from './entities/address.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { EmailerModule } from '../common/services/emailer/emailer.module';
import { LoggerModule } from '../logger/logger.module';
import { Plan } from '../plans/entities/plan.entity';
import { Profile } from './entities/profile.entity';
import { Role } from '../users/entities/role.entity';
import { StripeCustomer } from './entities/stripe-customers.entity';
import { User } from '../users/entities/user.entity';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';

@Module({
  controllers: [
    AccountsController,
    SettingsController
  ],
  imports: [
    AuthenticationModule,
    EmailerModule,
    LoggerModule,
    TypeOrmModule.forFeature([
      Account,
      Address,
      Profile,
      Role,
      StripeCustomer,
      User
    ])
  ],
  providers: [
    AccountsService,
    SettingsService
  ]
})
export class AccountsModule {}
