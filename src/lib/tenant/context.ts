import "server-only";
import { USER_ROLES } from "@/config/constants";
import { getCurrentUser } from "@/lib/auth/session";

export interface TenantContext {
  tenantId: string | null;
  isSuperAdmin: boolean;
}

export async function getTenantContext(): Promise<TenantContext | null> {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return {
    tenantId: user.role === USER_ROLES.SUPER_ADMIN ? null : user.companyId,
    isSuperAdmin: user.role === USER_ROLES.SUPER_ADMIN,
  };
}

export async function requireTenantContext(): Promise<TenantContext> {
  const tenant = await getTenantContext();
  if (!tenant) {
    throw new Error("Tenant context is unavailable for the current session.");
  }

  return tenant;
}
