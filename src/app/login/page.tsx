import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { USER_ROLES } from "@/config/constants";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    if (session.user.role === USER_ROLES.SUPER_ADMIN) {
      redirect("/admin/dashboard");
    }
    if (session.user.role === USER_ROLES.MANAGER) {
      redirect("/manager/dashboard");
    }
    if (session.user.role === USER_ROLES.WORKER) {
      redirect("/worker/dashboard");
    }

    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <LoginForm />
    </div>
  );
}
