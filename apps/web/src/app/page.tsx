import Link from 'next/link';
import { Button } from '@repo/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to Fullstack Monorepo
        </h1>
        <p className="text-center mb-8 text-muted-foreground">
          Production-quality monorepo for AI-driven full-stack web applications
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/studio">
            <Button>Open Studio</Button>
          </Link>
          <Link href="/api/auth/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
        <div className="mt-12 grid text-center lg:grid-cols-3 lg:text-left gap-4">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Next.js 15{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Modern React framework with App Router and Server Components
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              NestJS{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Progressive Node.js framework for building efficient APIs
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Turborepo{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              High-performance build system for JavaScript and TypeScript
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
