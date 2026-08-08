import { requireRole } from "@/lib/auth/session";
import { USER_ROLES } from "@/config/constants";

export default async function ManagerDashboardPage() {
  await requireRole(USER_ROLES.MANAGER);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
      <p className="mt-2 text-muted-foreground">This placeholder is protected for managers.</p>
    </div>
  );
}
