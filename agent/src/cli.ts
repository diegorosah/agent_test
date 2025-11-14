#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { generateCode } from './generator';

const program = new Command();

program
  .name('agent')
  .description('AI-driven code generator for monorepo applications')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate code from a specification file')
  .requiredOption('--spec <path>', 'Path to the specification YAML file')
  .option('--dry-run', 'Preview changes without writing files', false)
  .action(async (options) => {
    try {
      const specContent = readFileSync(options.spec, 'utf-8');
      const spec = parse(specContent);
      
      console.log('🚀 Starting code generation...');
      console.log(`📄 Spec file: ${options.spec}`);
      console.log(`🔍 Dry run: ${options.dryRun ? 'Yes' : 'No'}`);
      console.log('');
      
      await generateCode(spec, options.dryRun);
      
      console.log('');
      console.log('✅ Code generation completed successfully!');
    } catch (error) {
      console.error('❌ Error during code generation:', error);
      process.exit(1);
    }
  });

program.parse();
