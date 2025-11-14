import { z } from 'zod';

// Entity schema
export const EntityFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'relation']),
  required: z.boolean().default(true),
  unique: z.boolean().default(false),
  relation: z
    .object({
      target: z.string(),
      type: z.enum(['oneToOne', 'oneToMany', 'manyToOne', 'manyToMany']),
    })
    .optional(),
});

export const EntitySchema = z.object({
  name: z.string(),
  fields: z.array(EntityFieldSchema),
  timestamps: z.boolean().default(true),
});

// Page schema
export const PageSchema = z.object({
  path: z.string(),
  name: z.string(),
  type: z.enum(['list', 'detail', 'form', 'custom']),
  entity: z.string().optional(),
  protected: z.boolean().default(false),
});

// Endpoint schema
export const EndpointSchema = z.object({
  path: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  entity: z.string(),
  type: z.enum(['list', 'get', 'create', 'update', 'delete', 'custom']),
  protected: z.boolean().default(true),
});

// Auth configuration
export const AuthConfigSchema = z.object({
  providers: z.array(z.enum(['github', 'google', 'clerk'])),
  defaultProvider: z.enum(['github', 'google', 'clerk']).default('github'),
  jwtSecret: z.string().optional(),
});

// Stack preferences
export const StackPrefsSchema = z.object({
  database: z.enum(['postgresql', 'mysql', 'sqlite']).default('postgresql'),
  orm: z.enum(['prisma', 'typeorm']).default('prisma'),
  cssFramework: z.enum(['tailwind', 'styled-components']).default('tailwind'),
});

// Main app specification schema
export const AppSpecSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  version: z.string().default('0.1.0'),
  entities: z.array(EntitySchema),
  pages: z.array(PageSchema).optional(),
  endpoints: z.array(EndpointSchema).optional(),
  auth: AuthConfigSchema.optional(),
  stack: StackPrefsSchema.optional(),
});

export type EntityField = z.infer<typeof EntityFieldSchema>;
export type Entity = z.infer<typeof EntitySchema>;
export type Page = z.infer<typeof PageSchema>;
export type Endpoint = z.infer<typeof EndpointSchema>;
export type AuthConfig = z.infer<typeof AuthConfigSchema>;
export type StackPrefs = z.infer<typeof StackPrefsSchema>;
export type AppSpec = z.infer<typeof AppSpecSchema>;
