import { Module } from '@nestjs/common';
import { HealthProbeController } from './health-probe.controller';

@Module({
  controllers: [HealthProbeController],
})
export class HealthProbeModule {}
