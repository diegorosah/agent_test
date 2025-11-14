import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto, TodoResponseDto } from './todos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos', type: [TodoResponseDto] })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'Return a todo', type: TodoResponseDto })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created', type: TodoResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: 200, description: 'Todo updated', type: TodoResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 204, description: 'Todo deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
