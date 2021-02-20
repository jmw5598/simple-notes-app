import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailerService } from '../../common/services/emailer/emailer.service';
import { Role } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { repositoryMockFactory, emailerServiceMock } from '../../mocks';
import { Account } from '../entities/account.entity';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { AccountsService } from '../services/accounts.service';
import { AccountsController } from './accounts.controller';

describe('Accounts Controller', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AccountsController
      ],
      providers: [
        AccountsService,
        ConfigService,
        {
          provide: EmailerService,
          useValue: emailerServiceMock
        },
        { 
          provide: getRepositoryToken(Account), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Address), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Profile), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Role), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(User), 
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
