import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;

  const mockPrismaService = {
    todo: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [
        { id: '1', title: 'Test', completed: false, createdAt: new Date(), updatedAt: new Date() },
      ];
      mockPrismaService.todo.findMany.mockResolvedValue(mockTodos);

      const result = await service.findAll();
      expect(result).toEqual(mockTodos);
      expect(prisma.todo.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const mockTodo = { id: '1', title: 'Test', completed: false, createdAt: new Date(), updatedAt: new Date() };
      mockPrismaService.todo.findUnique.mockResolvedValue(mockTodo);

      const result = await service.findOne('1');
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockPrismaService.todo.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createDto = { title: 'New Todo', completed: false };
      const mockTodo = { id: '1', ...createDto, createdAt: new Date(), updatedAt: new Date() };
      mockPrismaService.todo.create.mockResolvedValue(mockTodo);

      const result = await service.create(createDto);
      expect(result).toEqual(mockTodo);
      expect(prisma.todo.create).toHaveBeenCalledWith({ data: createDto });
    });
  });
});
