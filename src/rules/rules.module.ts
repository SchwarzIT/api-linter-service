import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';

@Module({
  imports: [],
  controllers: [RulesController],
})
export class RulesModule {}
