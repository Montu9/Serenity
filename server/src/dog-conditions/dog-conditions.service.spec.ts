import { Test, TestingModule } from '@nestjs/testing';
import { DogConditionsService } from './dog-conditions.service';

describe('DogConditionsService', () => {
  let service: DogConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogConditionsService],
    }).compile();

    service = module.get<DogConditionsService>(DogConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
