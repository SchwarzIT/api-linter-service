import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './helpers/app.service';
import { HealthProbeModule } from './health-probe/health-probe.module';
import { LintingsModule } from './lintings/lintings.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [RulesModule, LintingsModule, HealthProbeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
