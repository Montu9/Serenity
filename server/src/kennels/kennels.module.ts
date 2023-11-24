import { Module } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { KennelsController } from './kennels.controller';

@Module({
  controllers: [KennelsController],
  providers: [KennelsService],
})
export class KennelsModule {}
