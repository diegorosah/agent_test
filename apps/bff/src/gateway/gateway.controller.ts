import { Controller, Get, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('todos')
  getTodos() {
    return this.gatewayService.getTodos();
  }

  @Get('todos/:id')
  getTodoById(@Param('id') id: string) {
    return this.gatewayService.getTodoById(id);
  }

  @Get('aggregated')
  getAggregatedData() {
    return this.gatewayService.getAggregatedData();
  }
}
