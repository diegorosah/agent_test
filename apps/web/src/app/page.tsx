export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Monorepo
        </h1>
        <p className="text-lg mb-8">
          A production-ready monorepo with AI-driven full-stack code generator
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Next.js 15</h2>
            <p>App Router, Server Components, and more</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">NestJS API</h2>
            <p>RESTful API with Prisma and PostgreSQL</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Turborepo</h2>
            <p>Monorepo build system</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">TypeScript</h2>
            <p>Type-safe across the stack</p>
          </div>
        </div>
      </div>
    </main>
  );
}
