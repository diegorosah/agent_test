import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './todos.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists
    await this.prisma.todo.delete({
      where: { id },
    });
  }
}
