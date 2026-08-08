/**
 * Authentication & Authorization Types
 *
 * Shared types for auth flows, sessions, and role-based access.
 * Actual auth implementation will be added in Phase 1.
 */

import { type UserRole, type AccountStatus } from "@/config/constants";

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

/** Minimal session user shape (aligned with NextAuth) */
export interface SessionUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    tenantId: string | null;
    image?: string | null;
}

/** Auth session returned to the client */
export interface Session {
    user: SessionUser;
    expires: string;
}

// ---------------------------------------------------------------------------
// Credentials
// ---------------------------------------------------------------------------

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordPayload {
    token: string;
    password: string;
    confirmPassword: string;
}

// ---------------------------------------------------------------------------
// Auth State
// ---------------------------------------------------------------------------

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: SessionUser | null;
}

// ---------------------------------------------------------------------------
// Permission
// ---------------------------------------------------------------------------

export interface Permission {
    resource: string;
    action: "create" | "read" | "update" | "delete" | "manage";
}

export type AccountStatusType = AccountStatus;
