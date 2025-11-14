import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the todo' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'The description of the todo', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
