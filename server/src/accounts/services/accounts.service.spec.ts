import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken} from '@nestjs/typeorm';
import { EmailerService } from '../../common/services/emailer/emailer.service';
import { repositoryMockFactory, emailerServiceMock } from '../../mocks';
import { Role } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { Account } from '../entities/account.entity';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
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
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
