import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../mocks';
import { Plan } from './entities/plan.entity';
import { PlansController } from './plans.controller';

describe('Plans Controller', () => {
  let controller: PlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        PlansController
      ],
      providers: [
        { 
          provide: getRepositoryToken(Plan), 
          useFactory: repositoryMockFactory
        },
      ]
    }).compile();

    controller = module.get<PlansController>(PlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
