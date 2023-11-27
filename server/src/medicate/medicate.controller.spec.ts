import { Test, TestingModule } from '@nestjs/testing';
import { MedicateController } from './medicate.controller';
import { MedicateService } from './medicate.service';

describe('MedicateController', () => {
  let controller: MedicateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicateController],
      providers: [MedicateService],
    }).compile();

    controller = module.get<MedicateController>(MedicateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
