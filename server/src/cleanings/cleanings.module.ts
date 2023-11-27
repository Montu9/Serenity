import { Module } from '@nestjs/common';
import { CleaningsService } from './cleanings.service';
import { CleaningsController } from './cleanings.controller';

@Module({
  controllers: [CleaningsController],
  providers: [CleaningsService],
})
export class CleaningsModule {}
