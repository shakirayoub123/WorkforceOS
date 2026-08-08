import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Access denied</CardTitle>
          <CardDescription>You do not have permission to view that area.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Please sign in with a suitable account or contact your administrator.</p>
        </CardContent>
      </Card>
    </div>
  );
}
