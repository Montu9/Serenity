import { Test, TestingModule } from '@nestjs/testing';
import { DogStatusesService } from './dog-statuses.service';

describe('DogStatusesService', () => {
  let service: DogStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogStatusesService],
    }).compile();

    service = module.get<DogStatusesService>(DogStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
