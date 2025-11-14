#!/usr/bin/env node

import { Command } from 'commander';
import { generateFromSpec } from './generator';
import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';
import { AppSpecSchema } from './schema';

const program = new Command();

program
  .name('agent')
  .description('AI-driven code generator for full-stack applications')
  .version('0.1.0');

program
  .command('generate')
  .description('Generate code from an app specification')
  .requiredOption('-s, --spec <path>', 'Path to the spec file (YAML or JSON)')
  .option('--dry-run', 'Show what would be generated without writing files', false)
  .action(async (options) => {
    try {
      const specPath = path.resolve(process.cwd(), options.spec);
      
      if (!fs.existsSync(specPath)) {
        console.error(`Error: Spec file not found: ${specPath}`);
        process.exit(1);
      }

      const specContent = fs.readFileSync(specPath, 'utf-8');
      let spec;

      if (specPath.endsWith('.yaml') || specPath.endsWith('.yml')) {
        spec = YAML.parse(specContent);
      } else {
        spec = JSON.parse(specContent);
      }

      // Validate spec against schema
      const validatedSpec = AppSpecSchema.parse(spec);

      console.log(`\n🚀 Generating code from spec: ${options.spec}`);
      console.log(`   Name: ${validatedSpec.name}`);
      console.log(`   Entities: ${validatedSpec.entities.length}`);
      console.log(`   Dry run: ${options.dryRun ? 'Yes' : 'No'}\n`);

      await generateFromSpec(validatedSpec, {
        dryRun: options.dryRun || false,
        rootDir: process.cwd(),
      });

      console.log('\n✅ Generation complete!\n');
    } catch (error) {
      console.error('\n❌ Error:', error instanceof Error ? error.message : error);
      if (error instanceof Error && error.stack) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
