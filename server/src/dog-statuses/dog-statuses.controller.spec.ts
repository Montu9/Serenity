import { Test, TestingModule } from '@nestjs/testing';
import { DogStatusesController } from './dog-statuses.controller';
import { DogStatusesService } from './dog-statuses.service';

describe('DogStatusesController', () => {
  let controller: DogStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogStatusesController],
      providers: [DogStatusesService],
    }).compile();

    controller = module.get<DogStatusesController>(DogStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
