import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { Address } from './entities/address.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { EmailerModule } from '../common/services/emailer/emailer.module';
import { LoggerModule } from '../logger/logger.module';
import { Profile } from './entities/profile.entity';
import { Role } from '../users/entities/role.entity';
import { KeyboardShortcutAction } from './entities/keyboard-shortcut-action.entity';
import { KeyboardShortcut } from './entities/keyboard-shortcut.entity';
import { StripeCustomer } from './entities/stripe-customers.entity';
import { User } from '../users/entities/user.entity';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { ThemesService } from '../themes/services/themes.service';
import { Theme } from '../themes/entities/theme.entity';

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
      User,
      KeyboardShortcut,
      KeyboardShortcutAction,
      Theme
    ])
  ],
  providers: [
    AccountsService,
    SettingsService,
    ThemesService
  ]
})
export class AccountsModule {}
