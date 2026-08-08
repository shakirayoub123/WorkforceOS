import { Loader2 } from "lucide-react";

/**
 * Global Loading UI
 *
 * Displayed by Next.js when a route segment is loading.
 * Uses a simple centered spinner appropriate for an enterprise app.
 */
export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Loading…</p>
            </div>
        </div>
    );
}
