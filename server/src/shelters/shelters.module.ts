import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';

@Module({
  controllers: [SheltersController],
  providers: [SheltersService],
})
export class SheltersModule {}
