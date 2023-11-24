import { Module } from '@nestjs/common';
import { DogConditionsService } from './dog-conditions.service';
import { DogConditionsController } from './dog-conditions.controller';

@Module({
  controllers: [DogConditionsController],
  providers: [DogConditionsService],
})
export class DogConditionsModule {}
