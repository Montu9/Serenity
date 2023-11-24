import { Test, TestingModule } from '@nestjs/testing';
import { DogConditionsController } from './dog-conditions.controller';
import { DogConditionsService } from './dog-conditions.service';

describe('DogConditionsController', () => {
  let controller: DogConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogConditionsController],
      providers: [DogConditionsService],
    }).compile();

    controller = module.get<DogConditionsController>(DogConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
