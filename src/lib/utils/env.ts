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
    AUTH_SECRET: getEnv("AUTH_SECRET", process.env.NEXTAUTH_SECRET ?? "dev-secret-change-in-production"),
    NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET", process.env.AUTH_SECRET ?? "dev-secret-change-in-production"),
    NEXTAUTH_URL: getEnv("NEXTAUTH_URL", "http://localhost:3000"),
    SEED_USER_PASSWORD: process.env.SEED_USER_PASSWORD ?? "ChangeMe123!",
} as const;
