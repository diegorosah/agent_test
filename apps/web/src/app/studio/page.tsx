'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Agent Studio</h1>
            </div>
            <div className="text-sm text-gray-600">{session.user?.name || session.user?.email}</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">App Specification Wizard</h2>
          <p className="text-gray-600 mb-6">
            Create your app specification using the visual wizard. This will generate the necessary
            code for your full-stack application.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Wizard UI Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">
              The visual spec wizard is under development. For now, use the CLI:
            </p>
            <div className="mt-4">
              <code className="bg-gray-100 px-4 py-2 rounded text-sm text-gray-800">
                pnpm agent:generate --spec specs/todo-app.yaml
              </code>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Can Generate:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Next.js pages and components with TypeScript</li>
              <li>NestJS modules, controllers, and services</li>
              <li>Prisma models and migrations</li>
              <li>API client code with type safety</li>
              <li>Unit and E2E tests</li>
              <li>CI/CD workflow configurations</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
