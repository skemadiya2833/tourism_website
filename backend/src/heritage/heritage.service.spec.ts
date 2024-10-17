import { Test, TestingModule } from '@nestjs/testing';
import { HeritageService } from './heritage.service';

describe('HeritageService', () => {
  let service: HeritageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeritageService],
    }).compile();

    service = module.get<HeritageService>(HeritageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
