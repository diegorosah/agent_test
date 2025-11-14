#!/usr/bin/env node
import { randomBytes } from 'crypto';

/**
 * Generate cryptographic secrets for authentication and encryption
 * Usage: pnpm gen:secret [--format=base64|hex] [--length=32]
 */

interface Options {
  format: 'base64' | 'hex';
  length: number;
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const options: Options = {
    format: 'hex',
    length: 32,
  };

  for (const arg of args) {
    if (arg.startsWith('--format=')) {
      const format = arg.split('=')[1] as 'base64' | 'hex';
      if (format === 'base64' || format === 'hex') {
        options.format = format;
      }
    }
    if (arg.startsWith('--length=')) {
      const length = parseInt(arg.split('=')[1], 10);
      if (!isNaN(length) && length > 0) {
        options.length = length;
      }
    }
  }

  return options;
}

function generateSecret(length: number, format: 'base64' | 'hex'): string {
  const bytes = randomBytes(length);
  
  if (format === 'base64') {
    return bytes.toString('base64');
  }
  
  return bytes.toString('hex');
}

function main() {
  const options = parseArgs();
  const secret = generateSecret(options.length, options.format);
  
  console.log('Generated Secret:');
  console.log('=================');
  
  if (options.format === 'hex') {
    console.log(`HEX_${options.length * 2}=${secret}`);
  } else {
    console.log(`BASE64=${secret}`);
  }
  
  console.log('');
  console.log('Add this to your .env file:');
  
  if (options.format === 'hex') {
    console.log(`NEXTAUTH_SECRET=${secret}`);
  } else {
    console.log(`SECRET=${secret}`);
  }
}

main();
