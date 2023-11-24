import { Test, TestingModule } from '@nestjs/testing';
import { IntakeTypesService } from './intake-types.service';

describe('IntakeTypesService', () => {
  let service: IntakeTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntakeTypesService],
    }).compile();

    service = module.get<IntakeTypesService>(IntakeTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
