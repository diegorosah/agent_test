'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Agent Monorepo</h1>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <Link
                    href="/studio"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Studio
                  </Link>
                  <span className="text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            AI-Driven Code Generator
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Production-quality monorepo for scaffolding full-stack web applications with TypeScript,
            Next.js, NestJS, and Prisma.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {session ? (
              <Link
                href="/studio"
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Open Studio
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
            <a
              href="https://github.com/diegorosah/agent_test"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-gray-900"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Features</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Monorepo Architecture
                </h3>
                <p className="text-gray-600">
                  Turborepo + PNPM workspaces for optimal development experience
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Stack</h3>
                <p className="text-gray-600">
                  Next.js 14, NestJS, Prisma, PostgreSQL, and TypeScript
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Auth Ready</h3>
                <p className="text-gray-600">
                  Auth.js with GitHub OAuth, optional Google and Clerk support
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Code Generator</h3>
                <p className="text-gray-600">
                  Generate full-stack features from YAML specifications
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Ready</h3>
                <p className="text-gray-600">CI/CD, Docker, tests, and deploy configs included</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Year Stability</h3>
                <p className="text-gray-600">
                  Built with long-term maintenance and stability in mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
