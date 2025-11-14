#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import { AppSpecSchema, AppSpec } from '../schema/app-spec';
import { Generator } from '../generators/generator';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('agent')
  .description('AI-driven code generator for full-stack applications')
  .version('0.0.1');

program
  .command('generate')
  .description('Generate code from specification')
  .requiredOption('-s, --spec <path>', 'Path to specification file (YAML)')
  .option('-d, --dry-run', 'Preview changes without writing files')
  .option('-o, --output <path>', 'Output directory (default: current directory)')
  .action(async (options) => {
    const spinner = ora('Loading specification...').start();
    
    try {
      // Read and parse spec file
      const specContent = readFileSync(options.spec, 'utf-8');
      const rawSpec = parseYaml(specContent);
      
      // Validate spec
      const spec: AppSpec = AppSpecSchema.parse(rawSpec);
      spinner.succeed('Specification loaded and validated');
      
      // Generate code
      const generator = new Generator({
        dryRun: options.dryRun || false,
        outputDir: options.output || process.cwd(),
      });
      
      spinner.start('Generating code...');
      await generator.generate(spec);
      
      spinner.succeed(chalk.green('Code generation completed successfully!'));
      
      if (options.dryRun) {
        console.log(chalk.yellow('\n⚠️  Dry run mode - no files were written'));
      }
      
      console.log(chalk.blue('\nNext steps:'));
      console.log('  1. Review the generated code');
      console.log('  2. Run: pnpm install');
      console.log('  3. Run: pnpm dev');
      
    } catch (error) {
      spinner.fail('Generation failed');
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      process.exit(1);
    }
  });

program.parse();
