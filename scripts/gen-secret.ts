#!/usr/bin/env node
/**
 * Generate strong secrets for NEXTAUTH_SECRET/JWT_SECRET
 * 
 * This script generates cryptographically secure random secrets suitable for
 * use in authentication systems like NextAuth.js.
 * 
 * Usage:
 *   pnpm gen:secret
 *   npm run gen:secret
 * 
 * Output:
 *   - HEX_64: A 64-character hexadecimal string
 *   - BASE64: A base64-encoded variant of the same secret
 */

import { randomBytes } from 'crypto';

/**
 * Generate a cryptographically secure random secret
 * @param bytes - Number of random bytes to generate (default: 32 for 64 hex chars)
 * @returns Object containing hex and base64 representations
 */
function generateSecret(bytes: number = 32): { hex: string; base64: string } {
  const buffer = randomBytes(bytes);
  
  return {
    hex: buffer.toString('hex'),
    base64: buffer.toString('base64')
  };
}

/**
 * Main execution
 */
function main(): void {
  try {
    const secret = generateSecret(32); // 32 bytes = 64 hex characters
    
    console.log(`HEX_64=${secret.hex}`);
    console.log(`BASE64=${secret.base64}`);
    
    // Optional: Print usage instructions
    console.log('\n# Usage:');
    console.log('# Copy one of the above values to your .env file:');
    console.log('# NEXTAUTH_SECRET=<HEX_64 or BASE64 value>');
    console.log('# JWT_SECRET=<HEX_64 or BASE64 value>');
  } catch (error) {
    console.error('Error generating secret:', error);
    process.exit(1);
  }
}

// Run the script
main();
