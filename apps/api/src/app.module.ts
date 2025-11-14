import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, AuthModule, TodosModule],
})
export class AppModule {}
