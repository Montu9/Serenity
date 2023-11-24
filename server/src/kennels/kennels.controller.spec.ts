import { Test, TestingModule } from '@nestjs/testing';
import { KennelsController } from './kennels.controller';
import { KennelsService } from './kennels.service';

describe('KennelsController', () => {
  let controller: KennelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KennelsController],
      providers: [KennelsService],
    }).compile();

    controller = module.get<KennelsController>(KennelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
