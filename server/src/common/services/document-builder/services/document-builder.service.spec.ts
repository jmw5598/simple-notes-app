import { Test, TestingModule } from '@nestjs/testing';
import { DocumentBuilderService } from './document-builder.service';

describe('DocumentBuilderService', () => {
  let service: DocumentBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentBuilderService],
    }).compile();

    service = module.get<DocumentBuilderService>(DocumentBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
