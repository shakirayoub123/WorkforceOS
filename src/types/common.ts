/**
 * Common / Shared Types
 *
 * Generic utility types used across the platform.
 */

// ---------------------------------------------------------------------------
// API Responses
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationMeta;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

// ---------------------------------------------------------------------------
// Query Parameters
// ---------------------------------------------------------------------------

export interface PaginationParams {
    page?: number;
    pageSize?: number;
}

export interface SortParams {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface SearchParams {
    search?: string;
}

export type ListQueryParams = PaginationParams & SortParams & SearchParams;

// ---------------------------------------------------------------------------
// Form / Action Helpers
// ---------------------------------------------------------------------------

export interface ActionResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    fieldErrors?: Record<string, string[]>;
}

// ---------------------------------------------------------------------------
// Generic Helpers
// ---------------------------------------------------------------------------

/** Make specific keys optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make specific keys required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Extract the resolved type from a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;
