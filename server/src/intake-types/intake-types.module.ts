import { Module } from '@nestjs/common';
import { IntakeTypesService } from './intake-types.service';
import { IntakeTypesController } from './intake-types.controller';

@Module({
  controllers: [IntakeTypesController],
  providers: [IntakeTypesService],
})
export class IntakeTypesModule {}
