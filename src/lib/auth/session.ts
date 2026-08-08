import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ACCOUNT_STATUS, USER_ROLES, type UserRole } from "@/config/constants";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string | null;
  status: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as UserRole,
    companyId: session.user.companyId ?? null,
    status: session.user.status ?? ACCOUNT_STATUS.ACTIVE,
  };
}

export async function requireAuth(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(roles: UserRole | UserRole[]): Promise<CurrentUser> {
  const user = await requireAuth();
  const permittedRoles = Array.isArray(roles) ? roles : [roles];

  if (!permittedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}

export async function requireCompanyAccess(companyId: string | null | undefined): Promise<CurrentUser> {
  const user = await requireAuth();
  if (user.role === USER_ROLES.SUPER_ADMIN) {
    return user;
  }

  if (!companyId || user.companyId !== companyId) {
    redirect("/unauthorized");
  }

  return user;
}
