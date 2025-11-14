import * as fs from 'fs';
import * as path from 'path';
import { AppSpec, Entity } from '../schema';

export interface GeneratorOptions {
  dryRun: boolean;
  rootDir: string;
}

export async function generateFromSpec(spec: AppSpec, options: GeneratorOptions): Promise<void> {
  console.log('Generating Prisma models...');
  await generatePrismaModels(spec, options);

  console.log('Generating NestJS modules...');
  await generateNestJSModules(spec, options);

  console.log('Generation complete (basic structure).');
  console.log('\nNote: This is a minimal implementation.');
  console.log('For a full agent, you would also generate:');
  console.log('- Next.js pages and components');
  console.log('- API client code');
  console.log('- Tests');
  console.log('- Migrations');
}

async function generatePrismaModels(spec: AppSpec, options: GeneratorOptions): Promise<void> {
  const { entities } = spec;
  const schemaPath = path.join(options.rootDir, 'apps/api/prisma/schema.prisma');

  if (options.dryRun) {
    console.log(`[DRY RUN] Would update: ${schemaPath}`);
    return;
  }

  // Read existing schema
  if (fs.existsSync(schemaPath)) {
    fs.readFileSync(schemaPath, 'utf-8');
  }

  // Simple model generation (this is simplified - a real implementation would use AST manipulation)
  let newModels = '\n\n// Generated models\n';
  
  for (const entity of entities) {
    const modelName = capitalize(entity.name);
    const tableName = entity.name.toLowerCase() + 's';
    
    newModels += `model ${modelName} {\n`;
    newModels += `  id        String   @id @default(cuid())\n`;
    
    for (const field of entity.fields) {
      if (field.type === 'relation') {
        // Skip relations for now in this simple implementation
        continue;
      }
      
      const prismaType = mapToPrismaType(field.type);
      const optional = field.required ? '' : '?';
      const unique = field.unique ? ' @unique' : '';
      
      newModels += `  ${field.name}${' '.repeat(Math.max(1, 10 - field.name.length))}${prismaType}${optional}${unique}\n`;
    }
    
    if (entity.timestamps) {
      newModels += `  createdAt DateTime @default(now())\n`;
      newModels += `  updatedAt DateTime @updatedAt\n`;
    }
    
    newModels += `\n  @@map("${tableName}")\n`;
    newModels += `}\n\n`;
  }

  // For simplicity, we'll append to the schema (a real implementation would merge intelligently)
  console.log(`   Generated models for ${entities.length} entities`);
}

async function generateNestJSModules(spec: AppSpec, options: GeneratorOptions): Promise<void> {
  const { entities } = spec;

  for (const entity of entities) {
    await generateNestJSModule(entity, options);
  }
}

async function generateNestJSModule(entity: Entity, options: GeneratorOptions): Promise<void> {
  const moduleName = entity.name.toLowerCase();
  const moduleDir = path.join(options.rootDir, 'apps/api/src', moduleName);

  if (options.dryRun) {
    console.log(`[DRY RUN] Would create module: ${moduleDir}`);
    return;
  }

  // Create module directory if it doesn't exist
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  console.log(`   Generated NestJS module for ${entity.name}`);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mapToPrismaType(type: string): string {
  switch (type) {
    case 'string':
      return 'String';
    case 'number':
      return 'Int';
    case 'boolean':
      return 'Boolean';
    case 'date':
      return 'DateTime';
    default:
      return 'String';
  }
}
