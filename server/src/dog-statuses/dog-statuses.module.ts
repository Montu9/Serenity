import { Module } from '@nestjs/common';
import { DogStatusesService } from './dog-statuses.service';
import { DogStatusesController } from './dog-statuses.controller';

@Module({
  controllers: [DogStatusesController],
  providers: [DogStatusesService],
})
export class DogStatusesModule {}
