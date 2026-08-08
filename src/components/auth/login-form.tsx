"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ROLES } from "@/config/constants";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const roleRedirectMap: Record<string, string> = {
  [USER_ROLES.SUPER_ADMIN]: "/admin/dashboard",
  [USER_ROLES.COMPANY_ADMIN]: "/dashboard",
  [USER_ROLES.MANAGER]: "/manager/dashboard",
  [USER_ROLES.WORKER]: "/worker/dashboard",
};

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes("inactive")) {
          setError("This account is inactive. Please contact your administrator.");
        } else if (result.error.includes("suspended")) {
          setError("This account has been suspended.");
        } else {
          setError("Invalid email or password. Please try again.");
        }
        return;
      }

      const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" });
      if (!sessionResponse.ok) {
        setError("Unable to establish a session. Please try again.");
        return;
      }

      const session = await sessionResponse.json();
      const role = session?.user?.role as keyof typeof roleRedirectMap | undefined;
      router.replace(roleRedirectMap[role ?? USER_ROLES.WORKER] ?? "/dashboard");
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to your workspace</CardTitle>
        <CardDescription>Use your company credentials to access the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...form.register("password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password ? (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            ) : null}
          </div>

          {error ? <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? "Signing in..." : "Sign in"}
          </Button>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="#">
              Forgot password?
            </Link>
            <Link className="hover:text-foreground" href="/">
              Back home
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
