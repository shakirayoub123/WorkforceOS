/**
 * User Types
 *
 * Shared user-related type definitions used across the platform.
 */

import { type UserRole, type AccountStatus } from "@/config/constants";

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: AccountStatus;
    tenantId: string | null;
    image?: string | null;
    phone?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

/** Subset of user fields safe to expose on the client */
export type PublicUser = Pick<User, "id" | "name" | "email" | "role" | "image">;

// ---------------------------------------------------------------------------
// User Operations
// ---------------------------------------------------------------------------

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    tenantId?: string;
    phone?: string;
}

export interface UpdateUserPayload {
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
    role?: UserRole;
    status?: AccountStatus;
}
