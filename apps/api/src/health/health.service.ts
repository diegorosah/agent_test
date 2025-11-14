import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async check() {
    const dbHealthy = await this.checkDatabase();
    return {
      status: dbHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      database: dbHealthy ? 'connected' : 'disconnected',
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }
}
