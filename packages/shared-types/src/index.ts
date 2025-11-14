import { z } from 'zod';

// Todo schemas and types
export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTodoSchema = TodoSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;

// User schemas and types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// API Response types
export const ApiErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  error: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
