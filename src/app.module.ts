import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './helpers/app.service';
import { HealthProbeModule } from './health-probe/health-probe.module';
import { LintingsModule } from './lintings/lintings.module';
import { RulesModule } from './rules/rules.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    RulesModule,
    LintingsModule,
    HealthProbeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
