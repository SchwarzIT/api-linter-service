import { Module } from '@nestjs/common';
import { LintingsController } from './lintings.controller';
import { LintingsService } from './lintings.service';

@Module({
  imports: [],
  controllers: [LintingsController],
  providers: [LintingsService],
})
export class LintingsModule {}
