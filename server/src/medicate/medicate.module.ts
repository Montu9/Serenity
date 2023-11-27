import { Module } from '@nestjs/common';
import { MedicateService } from './medicate.service';
import { MedicateController } from './medicate.controller';

@Module({
  controllers: [MedicateController],
  providers: [MedicateService],
})
export class MedicateModule {}
