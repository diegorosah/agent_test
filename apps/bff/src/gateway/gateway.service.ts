import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  private readonly apiUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.get<string>('API_URL') || 'http://localhost:3001';
  }

  async getTodos() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/todos`)
    );
    return response.data;
  }

  async getTodoById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/todos/${id}`)
    );
    return response.data;
  }

  // Add more aggregation methods as needed
  async getAggregatedData() {
    // Example: aggregate data from multiple sources
    const todos = await this.getTodos();
    return {
      todos,
      meta: {
        aggregatedAt: new Date().toISOString(),
        source: 'bff',
      },
    };
  }
}
