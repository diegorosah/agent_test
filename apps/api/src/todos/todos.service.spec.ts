import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from '../common/prisma/prisma.service';

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const userId = 'user123';
      const createTodoDto = { title: 'Test Todo', description: 'Test Description' };
      const expectedResult = { id: '1', ...createTodoDto, userId, completed: false };

      jest.spyOn(prisma.todo, 'create').mockResolvedValue(expectedResult as any);

      const result = await service.create(userId, createTodoDto);
      expect(result).toEqual(expectedResult);
      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: { ...createTodoDto, userId },
      });
    });
  });

  describe('findAll', () => {
    it('should return all todos for a user', async () => {
      const userId = 'user123';
      const expectedResult = [
        { id: '1', title: 'Todo 1', userId, completed: false },
        { id: '2', title: 'Todo 2', userId, completed: true },
      ];

      jest.spyOn(prisma.todo, 'findMany').mockResolvedValue(expectedResult as any);

      const result = await service.findAll(userId);
      expect(result).toEqual(expectedResult);
      expect(prisma.todo.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
