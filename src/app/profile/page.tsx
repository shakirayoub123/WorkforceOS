import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Authenticated user details for your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{session.user.name}</p></div>
          <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{session.user.email}</p></div>
          <div><p className="text-sm text-muted-foreground">Role</p><p className="font-medium">{session.user.role}</p></div>
          <div><p className="text-sm text-muted-foreground">Company</p><p className="font-medium">{session.user.companyId ?? "Platform"}</p></div>
          <div><p className="text-sm text-muted-foreground">Status</p><p className="font-medium">{session.user.status}</p></div>
          <div className="pt-2"><LogoutButton /></div>
        </CardContent>
      </Card>
    </div>
  );
}
