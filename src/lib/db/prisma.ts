import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma Client Singleton
 *
 * Prevents multiple Prisma Client instances during development hot reload.
 * In production, a single instance is created normally.
 *
 * Prisma 7 requires a driver adapter. We use @prisma/adapter-pg
 * which connects directly to PostgreSQL using the pg driver.
 *
 * @see https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
 */

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL environment variable is not set");
    }

    const adapter = new PrismaPg({ connectionString });

    return new PrismaClient({
        adapter,
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
