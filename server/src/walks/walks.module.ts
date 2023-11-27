import { Module } from '@nestjs/common';
import { WalksService } from './walks.service';
import { WalksController } from './walks.controller';

@Module({
  controllers: [WalksController],
  providers: [WalksService],
})
export class WalksModule {}
