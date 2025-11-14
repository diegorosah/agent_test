import { z } from 'zod';

// Todo schemas
export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTodoSchema = TodoSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const UpdateTodoSchema = CreateTodoSchema.partial();

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Auth schemas
export const JwtPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  iat: z.number(),
  exp: z.number(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
