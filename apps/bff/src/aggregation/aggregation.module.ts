import { Module } from '@nestjs/common';
import { AggregationController } from './aggregation.controller';

@Module({
  controllers: [AggregationController],
})
export class AggregationModule {}
