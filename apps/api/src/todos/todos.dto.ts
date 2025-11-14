import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries', description: 'Title of the todo' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Milk, eggs, bread', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: false, default: false, required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateTodoDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class TodoResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
