/**
 * Application Constants
 *
 * Centralized constants used throughout the platform.
 * Roles, statuses, and other enumerations live here.
 */

// ---------------------------------------------------------------------------
// User Roles
// ---------------------------------------------------------------------------

export const USER_ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    COMPANY_ADMIN: "COMPANY_ADMIN",
    MANAGER: "MANAGER",
    WORKER: "WORKER",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/** All roles ordered by privilege level (highest first) */
export const ROLE_HIERARCHY: UserRole[] = [
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.COMPANY_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.WORKER,
];

// ---------------------------------------------------------------------------
// Account Status
// ---------------------------------------------------------------------------

export const ACCOUNT_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    SUSPENDED: "SUSPENDED",
    PENDING: "PENDING",
} as const;

export type AccountStatus = (typeof ACCOUNT_STATUS)[keyof typeof ACCOUNT_STATUS];

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
} as const;

// ---------------------------------------------------------------------------
// Date / Time
// ---------------------------------------------------------------------------

export const DATE_FORMATS = {
    DISPLAY: "MMM dd, yyyy",
    DISPLAY_WITH_TIME: "MMM dd, yyyy HH:mm",
    ISO: "yyyy-MM-dd",
    TIME: "HH:mm",
} as const;
