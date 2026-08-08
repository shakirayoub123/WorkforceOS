/**
 * Server-only Environment Validation
 *
 * This module validates and exports server-side environment variables.
 * It should ONLY be imported in server components, server actions, or API routes.
 *
 * Importing this in a client component will throw at build time.
 */

import "server-only";

function getEnv(key: string, fallback?: string): string {
    const value = process.env[key] ?? fallback;
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const serverEnv = {
    DATABASE_URL: getEnv("DATABASE_URL"),
    NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET", "dev-secret-change-in-production"),
    NEXTAUTH_URL: getEnv("NEXTAUTH_URL", "http://localhost:3000"),
} as const;
