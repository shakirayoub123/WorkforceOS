import { requireRole } from "@/lib/auth/session";
import { USER_ROLES } from "@/config/constants";

export default async function AdminDashboardPage() {
  await requireRole(USER_ROLES.SUPER_ADMIN);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">This placeholder is protected for super administrators.</p>
    </div>
  );
}
