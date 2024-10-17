import { Test, TestingModule } from '@nestjs/testing';
import { HeritageController } from './heritage.controller';

describe('HeritageController', () => {
  let controller: HeritageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeritageController],
    }).compile();

    controller = module.get<HeritageController>(HeritageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
