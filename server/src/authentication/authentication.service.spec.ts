import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';

import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';
import { jwtServiceMock, repositoryMockFactory } from '../mocks';
import { Role } from '../users/entities/role.entity';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from './services/refresh-tokens.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UsersService,
        RefreshTokensService,
        { 
          provide: getRepositoryToken(User), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(RefreshToken), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Role), 
          useFactory: repositoryMockFactory
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock
        }
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
