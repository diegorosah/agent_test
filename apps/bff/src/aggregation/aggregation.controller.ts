import { Controller, Get } from '@nestjs/common';

@Controller('aggregate')
export class AggregationController {
  @Get('dashboard')
  async getDashboard() {
    // Skeleton for aggregating data from multiple services
    // In a real app, this would call multiple microservices and combine results
    return {
      message: 'BFF aggregation layer - ready for implementation',
      upstreamApi: process.env.UPSTREAM_API_URL,
    };
  }
}
