/**
 * Prisma Database Seed
 *
 * This file is executed with `npx prisma db seed` to populate
 * the database with initial data (e.g., super admin user, default
 * roles, demo company).
 *
 * Implementation will be added once the database schema is defined
 * in Phase 1.
 */

async function main() {
    console.log("🌱 Starting database seed...");

    // TODO: Phase 1 — Seed super admin user
    // TODO: Phase 1 — Seed default roles / permissions
    // TODO: Phase 1 — Seed demo company (dev only)

    console.log("✅ Database seed completed.");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    });
