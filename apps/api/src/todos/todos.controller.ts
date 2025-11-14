import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto, TodoResponseDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  create(
    @CurrentUser() user: any,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<TodoResponseDto> {
    return this.todosService.create(user.userId, createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos for the current user' })
  findAll(@CurrentUser() user: any): Promise<TodoResponseDto[]> {
    return this.todosService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific todo by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any): Promise<TodoResponseDto> {
    return this.todosService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoResponseDto> {
    return this.todosService.update(id, user.userId, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  remove(@Param('id') id: string, @CurrentUser() user: any): Promise<TodoResponseDto> {
    return this.todosService.remove(id, user.userId);
  }
}
