import { z } from 'zod';

export const EntityFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'uuid', 'relation']),
  required: z.boolean().default(false),
  unique: z.boolean().default(false),
  default: z.any().optional(),
  relation: z.object({
    model: z.string(),
    type: z.enum(['one-to-one', 'one-to-many', 'many-to-many']),
  }).optional(),
});

export const EntitySchema = z.object({
  name: z.string(),
  fields: z.array(EntityFieldSchema),
  timestamps: z.boolean().default(true),
});

export const PageSchema = z.object({
  name: z.string(),
  route: z.string(),
  type: z.enum(['list', 'detail', 'form', 'custom']),
  entity: z.string().optional(),
  protected: z.boolean().default(false),
});

export const EndpointSchema = z.object({
  path: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  entity: z.string().optional(),
  protected: z.boolean().default(false),
  description: z.string().optional(),
});

export const AuthConfigSchema = z.object({
  provider: z.enum(['nextauth', 'clerk']).default('nextauth'),
  providers: z.array(z.enum(['github', 'google', 'credentials'])).default(['github']),
  rbac: z.boolean().default(false),
  roles: z.array(z.string()).default(['USER', 'ADMIN']),
});

export const DeployConfigSchema = z.object({
  web: z.enum(['vercel', 'netlify', 'custom']).default('vercel'),
  api: z.enum(['fly', 'render', 'railway', 'custom']).default('fly'),
  database: z.enum(['neon', 'railway', 'render', 'custom']).default('neon'),
});

export const AppSpecSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  version: z.string().default('1.0.0'),
  entities: z.array(EntitySchema),
  pages: z.array(PageSchema).optional(),
  endpoints: z.array(EndpointSchema).optional(),
  auth: AuthConfigSchema.optional(),
  deploy: DeployConfigSchema.optional(),
});

export type EntityField = z.infer<typeof EntityFieldSchema>;
export type Entity = z.infer<typeof EntitySchema>;
export type Page = z.infer<typeof PageSchema>;
export type Endpoint = z.infer<typeof EndpointSchema>;
export type AuthConfig = z.infer<typeof AuthConfigSchema>;
export type DeployConfig = z.infer<typeof DeployConfigSchema>;
export type AppSpec = z.infer<typeof AppSpecSchema>;
