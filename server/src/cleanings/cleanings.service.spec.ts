import { Test, TestingModule } from '@nestjs/testing';
import { CleaningsService } from './cleanings.service';

describe('CleaningsService', () => {
  let service: CleaningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleaningsService],
    }).compile();

    service = module.get<CleaningsService>(CleaningsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
