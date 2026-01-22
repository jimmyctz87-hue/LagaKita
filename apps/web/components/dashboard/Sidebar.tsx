"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Trophy, Map, Settings, LogOut, ChevronLeft, ChevronRight, ClipboardList, Users, Building2, MapPin } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    userRole: string;
    userEmail: string | null;
}

export function Sidebar({ userRole, userEmail }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const isOwner = userRole === "FIELD_OWNER" || userRole === "ADMIN";
    const isAdmin = userRole === "ADMIN";

    const isActive = (path: string) => pathname === path;

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        ...(isAdmin ? [
            { href: "/dashboard/users", label: "Manage Users", icon: Users },
            { href: "/dashboard/coverage", label: "Coverage Areas", icon: MapPin },
            { href: "/dashboard/venues", label: "All Venues", icon: Building2 },
        ] : []),
        ...(isOwner && !isAdmin
            ? [
                { href: "/dashboard/schedule", label: "Schedule", icon: Calendar },
                { href: "/dashboard/venues", label: "My Venues", icon: Map },
            ]
            : []),
        ...(!isOwner
            ? [
                { href: "/explore", label: "Book a Field", icon: Map },
            ]
            : []),
        { href: "/dashboard/leagues", label: "Leagues", icon: Trophy },
        { href: "/dashboard/bookings", label: isAdmin ? "All Bookings" : (isOwner ? "Incoming Bookings" : "My Bookings"), icon: ClipboardList },
    ];

    return (
        <aside
            className={`relative bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <h2 className="text-2xl font-bold text-primary tracking-tighter animate-in fade-in duration-300">
                        LagaKita <span className="text-white text-xs font-normal block md:inline">{isOwner ? "Partner" : "Player"}</span>
                    </h2>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-2 mt-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${active
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                            title={collapsed ? link.label : ""}
                        >
                            <Icon size={20} className={active ? "text-primary" : "text-slate-400 group-hover:text-white"} />
                            {!collapsed && <span>{link.label}</span>}
                            {active && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(50,205,50,0.5)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                {!collapsed && (
                    <div className="mb-4 px-2">
                        <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Account</div>
                        <div className="text-sm font-medium text-slate-300 truncate" title={userEmail || ""}>
                            {userEmail}
                        </div>
                    </div>
                )}

                <form action="/auth/signout" method="post">
                    <button
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 ${collapsed ? "justify-center" : ""
                            }`}
                        title={collapsed ? "Sign Out" : ""}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </form>
            </div>
        </aside>
    );
}
