import {
    LayoutDashboard,
    Building2,
    Users,
    FolderKanban,
    ClipboardList,
    MapPin,
    CalendarOff,
    Package,
    DollarSign,
    MessageSquare,
    BarChart3,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { type UserRole, USER_ROLES } from "./constants";

// ---------------------------------------------------------------------------
// Navigation Item Type
// ---------------------------------------------------------------------------

export interface NavItem {
    /** Display label */
    label: string;

    /** Route path */
    href: string;

    /** Lucide icon component */
    icon: LucideIcon;

    /** Roles that can access this item (empty = all roles) */
    roles: UserRole[];

    /** Whether this item is disabled / coming soon */
    disabled?: boolean;

    /** Nested child items */
    children?: NavItem[];
}

// ---------------------------------------------------------------------------
// Navigation Configuration
// ---------------------------------------------------------------------------

const { SUPER_ADMIN, COMPANY_ADMIN, MANAGER, WORKER } = USER_ROLES;

/**
 * Main sidebar navigation.
 *
 * Items will be filtered at render time based on the authenticated
 * user's role. Disabled items are shown but not clickable.
 */
export const mainNavigation: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: [SUPER_ADMIN, COMPANY_ADMIN, MANAGER, WORKER],
    },
    {
        label: "Companies",
        href: "/admin/companies",
        icon: Building2,
        roles: [SUPER_ADMIN],
        disabled: true,
    },
    {
        label: "Workers",
        href: "/workers",
        icon: Users,
        roles: [COMPANY_ADMIN, MANAGER],
        disabled: true,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
        roles: [COMPANY_ADMIN, MANAGER, WORKER],
        disabled: true,
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: ClipboardList,
        roles: [COMPANY_ADMIN, MANAGER, WORKER],
        disabled: true,
    },
    {
        label: "Attendance",
        href: "/attendance",
        icon: MapPin,
        roles: [COMPANY_ADMIN, MANAGER, WORKER],
        disabled: true,
    },
    {
        label: "Leave",
        href: "/leave",
        icon: CalendarOff,
        roles: [COMPANY_ADMIN, MANAGER, WORKER],
        disabled: true,
    },
    {
        label: "Inventory",
        href: "/inventory",
        icon: Package,
        roles: [COMPANY_ADMIN, MANAGER],
        disabled: true,
    },
    {
        label: "Payroll",
        href: "/payroll",
        icon: DollarSign,
        roles: [COMPANY_ADMIN],
        disabled: true,
    },
    {
        label: "Messages",
        href: "/messages",
        icon: MessageSquare,
        roles: [SUPER_ADMIN, COMPANY_ADMIN, MANAGER, WORKER],
        disabled: true,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        roles: [SUPER_ADMIN, COMPANY_ADMIN, MANAGER],
        disabled: true,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        roles: [SUPER_ADMIN, COMPANY_ADMIN],
        disabled: true,
    },
];

// ---------------------------------------------------------------------------
// Helper — filter navigation by role
// ---------------------------------------------------------------------------

/**
 * Returns only the navigation items the given role is allowed to see.
 */
export function getNavigationForRole(role: UserRole): NavItem[] {
    return mainNavigation.filter(
        (item) => item.roles.length === 0 || item.roles.includes(role)
    );
}
