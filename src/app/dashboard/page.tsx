import { requireAuth } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome, {user.name}. Your authenticated workspace is ready.</p>
    </div>
  );
}
