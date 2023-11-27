import { Test, TestingModule } from '@nestjs/testing';
import { FeedingsController } from './feedings.controller';
import { FeedingsService } from './feedings.service';

describe('FeedingsController', () => {
  let controller: FeedingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedingsController],
      providers: [FeedingsService],
    }).compile();

    controller = module.get<FeedingsController>(FeedingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
