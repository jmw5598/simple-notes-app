import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../users/entities/role.entity';
import { jwtServiceMock, repositoryMockFactory } from '../mocks';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { UsersService } from '../users/users.service';

describe('Authentication Controller', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AuthenticationController
      ],
      providers: [
        AuthenticationService,
        UsersService,
        RefreshTokensService,
        { 
          provide: getRepositoryToken(RefreshToken), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(User), 
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
      ]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
