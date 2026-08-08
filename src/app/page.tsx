import Link from "next/link";
import { ArrowRight, Shield, Building2, Users, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { appConfig } from "@/config/app";
import type { LucideIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              {appConfig.name}
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ----------------------------------------------------------------- */}
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            Currently in Development
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Workforce Management{" "}
            <span className="text-muted-foreground">Made Simple</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {appConfig.description}. Manage your teams, projects, attendance,
            payroll, and more — all from one powerful platform.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Feature Highlights                                              */}
        {/* --------------------------------------------------------------- */}
        <section className="border-t bg-muted/40">
          <div className="container mx-auto grid gap-8 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-24">
            <FeatureCard
              icon={Building2}
              title="Multi-Tenant"
              description="Each company gets its own isolated workspace with full admin control."
            />
            <FeatureCard
              icon={Users}
              title="Team Management"
              description="Manage workers, managers, and admins with role-based permissions."
            />
            <FeatureCard
              icon={FolderKanban}
              title="Project Tracking"
              description="Organize projects, assign tasks, and track progress in real-time."
            />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ----------------------------------------------------------------- */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {appConfig.company}. All rights
            reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            v{appConfig.version}
          </p>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature Card (local component — not exported)
// ---------------------------------------------------------------------------

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent/50">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
