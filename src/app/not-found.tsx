import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 404 — Not Found Page
 *
 * Custom 404 page maintaining the application's design language.
 */
export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="flex max-w-md flex-col items-center gap-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-lg font-medium">Page Not Found</h2>
                    <p className="text-sm text-muted-foreground">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </div>
    );
}
