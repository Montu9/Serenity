import { Module } from '@nestjs/common';
import { FeedingsService } from './feedings.service';
import { FeedingsController } from './feedings.controller';

@Module({
  controllers: [FeedingsController],
  providers: [FeedingsService],
})
export class FeedingsModule {}
