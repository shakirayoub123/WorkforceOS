"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Global Error Boundary
 *
 * Catches unhandled errors in the route tree and provides a
 * recovery option. Never exposes internal error details in production.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        // Log the error for observability (replace with your logging service)
        console.error("[GlobalError]", error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex max-w-md flex-col items-center gap-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Something went wrong</h2>
                    <p className="text-sm text-muted-foreground">
                        An unexpected error occurred. Our team has been notified. Please try
                        again or contact support if the problem persists.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.push("/")}>
                        Go Home
                    </Button>
                    <Button onClick={() => reset()}>Try Again</Button>
                </div>
            </div>
        </div>
    );
}
