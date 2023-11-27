import { Test, TestingModule } from '@nestjs/testing';
import { FeedingsService } from './feedings.service';

describe('FeedingsService', () => {
  let service: FeedingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedingsService],
    }).compile();

    service = module.get<FeedingsService>(FeedingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
