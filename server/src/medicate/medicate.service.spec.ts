import { Test, TestingModule } from '@nestjs/testing';
import { MedicateService } from './medicate.service';

describe('MedicateService', () => {
  let service: MedicateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicateService],
    }).compile();

    service = module.get<MedicateService>(MedicateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
