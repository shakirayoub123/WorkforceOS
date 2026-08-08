import bcrypt from "bcryptjs";
import { ACCOUNT_STATUS, USER_ROLES } from "../src/config/constants";
import { normalizeEmail } from "../src/lib/auth/password";
import { prisma } from "../src/lib/db/prisma";

async function main() {
    const seedPassword = process.env.SEED_USER_PASSWORD;

    if (!seedPassword) {
        throw new Error("Missing SEED_USER_PASSWORD environment variable.");
    }

    const passwordHash = await bcrypt.hash(seedPassword, 12);

    const company = await prisma.company.upsert({
        where: { slug: "acme-construction" },
        update: {},
        create: {
            name: "Acme Construction",
            slug: "acme-construction",
            email: "hello@acme.test",
            phone: "+1-555-0100",
            website: "https://acme.test",
            logo: null,
            address: "123 Market Street",
            city: "Seattle",
            state: "WA",
            country: "US",
            timezone: "America/Los_Angeles",
            status: "ACTIVE",
        },
    });

    const secondCompany = await prisma.company.upsert({
        where: { slug: "northwind-labs" },
        update: {},
        create: {
            name: "Northwind Labs",
            slug: "northwind-labs",
            email: "ops@northwind.test",
            phone: "+1-555-0199",
            website: "https://northwind.test",
            logo: null,
            address: "500 Harbor Avenue",
            city: "Portland",
            state: "OR",
            country: "US",
            timezone: "America/Los_Angeles",
            status: "ACTIVE",
        },
    });

    await prisma.user.upsert({
        where: { email: normalizeEmail("superadmin@example.com") },
        update: {},
        create: {
            name: "Super Admin",
            email: normalizeEmail("superadmin@example.com"),
            passwordHash,
            role: USER_ROLES.SUPER_ADMIN,
            phone: null,
            avatar: null,
            status: ACCOUNT_STATUS.ACTIVE,
            emailVerified: true,
            companyId: null,
        },
    });

    await prisma.user.upsert({
        where: { email: normalizeEmail("admin@acme.test") },
        update: {},
        create: {
            name: "Acme Admin",
            email: normalizeEmail("admin@acme.test"),
            passwordHash,
            role: USER_ROLES.COMPANY_ADMIN,
            phone: null,
            avatar: null,
            status: ACCOUNT_STATUS.ACTIVE,
            emailVerified: true,
            companyId: company.id,
        },
    });

    await prisma.user.upsert({
        where: { email: normalizeEmail("manager@acme.test") },
        update: {},
        create: {
            name: "Acme Manager",
            email: normalizeEmail("manager@acme.test"),
            passwordHash,
            role: USER_ROLES.MANAGER,
            phone: null,
            avatar: null,
            status: ACCOUNT_STATUS.ACTIVE,
            emailVerified: true,
            companyId: company.id,
        },
    });

    await prisma.user.upsert({
        where: { email: normalizeEmail("worker@acme.test") },
        update: {},
        create: {
            name: "Acme Worker",
            email: normalizeEmail("worker@acme.test"),
            passwordHash,
            role: USER_ROLES.WORKER,
            phone: null,
            avatar: null,
            status: ACCOUNT_STATUS.ACTIVE,
            emailVerified: true,
            companyId: company.id,
        },
    });

    await prisma.user.upsert({
        where: { email: normalizeEmail("ops@northwind.test") },
        update: {},
        create: {
            name: "Northwind Admin",
            email: normalizeEmail("ops@northwind.test"),
            passwordHash,
            role: USER_ROLES.COMPANY_ADMIN,
            phone: null,
            avatar: null,
            status: ACCOUNT_STATUS.ACTIVE,
            emailVerified: true,
            companyId: secondCompany.id,
        },
    });

    console.log("✅ Database seed completed.");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    });
