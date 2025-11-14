export default function StudioPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">App Studio</h1>
      <p className="text-muted-foreground mb-8">
        Use this wizard to define your application specification.
      </p>
      
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">1. Define Entities</h2>
          <p className="text-sm text-muted-foreground">
            Define your data models and their relationships
          </p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">2. Configure Authentication</h2>
          <p className="text-sm text-muted-foreground">
            Choose authentication providers and configure permissions
          </p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">3. Design Pages</h2>
          <p className="text-sm text-muted-foreground">
            Create your frontend pages and components
          </p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">4. Generate Code</h2>
          <p className="text-sm text-muted-foreground">
            Generate your application code based on the specification
          </p>
        </div>
      </div>
    </div>
  );
}
