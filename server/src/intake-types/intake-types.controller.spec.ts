import { Test, TestingModule } from '@nestjs/testing';
import { IntakeTypesController } from './intake-types.controller';
import { IntakeTypesService } from './intake-types.service';

describe('IntakeTypesController', () => {
  let controller: IntakeTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntakeTypesController],
      providers: [IntakeTypesService],
    }).compile();

    controller = module.get<IntakeTypesController>(IntakeTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
