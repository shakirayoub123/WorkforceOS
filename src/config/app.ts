/**
 * Application Configuration
 *
 * Central configuration for the WorkforceOS platform.
 * Update these values to customize the application identity.
 */

export const appConfig = {
    /** Application name displayed across the platform */
    name: "WorkforceOS",

    /** Short description for metadata and landing pages */
    description: "SaaS Workforce and Project Management Platform",

    /** Current application version */
    version: "0.1.0",

    /** Public-facing URL (from environment or fallback) */
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

    /** Company / organization name */
    company: "WorkforceOS Inc.",

    /** Support email */
    supportEmail: "support@workforceos.com",
} as const;

/** SEO-specific metadata */
export const seoConfig = {
    titleTemplate: `%s | ${appConfig.name}`,
    defaultTitle: appConfig.name,
    description: appConfig.description,
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: appConfig.name,
    },
} as const;
