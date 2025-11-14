import { Module } from '@nestjs/common';
import { AggregationModule } from './aggregation/aggregation.module';

@Module({
  imports: [AggregationModule],
})
export class AppModule {}
