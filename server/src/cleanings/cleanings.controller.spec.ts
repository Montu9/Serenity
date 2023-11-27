import { Test, TestingModule } from '@nestjs/testing';
import { CleaningsController } from './cleanings.controller';
import { CleaningsService } from './cleanings.service';

describe('CleaningsController', () => {
  let controller: CleaningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleaningsController],
      providers: [CleaningsService],
    }).compile();

    controller = module.get<CleaningsController>(CleaningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
