import { StatsCard } from "@/components/dashboard/StatsCard";
import { UpcomingMatchCard } from "@/components/dashboard/UpcomingMatchCard";
import { CreditCard, Trophy, Users, Building2, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { prisma, UserRole } from "@repo/database";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        include: {
            venues: {
                include: {
                    fields: {
                        include: {
                            bookings: true
                        }
                    }
                }
            }
        }
    });

    if (!dbUser) {
        return <div>User not found</div>
    }

    const role = dbUser.role;
    let stats = {
        label1: "Total Bookings",
        value1: 0,
        label2: "Active Venues",
        value2: 0,
        label3: "Total Revenue",
        value3: "Rp 0"
    };

    if (role === "ADMIN") {
        const totalUsers = await prisma.user.count();
        const totalVenues = await prisma.venue.count();
        const totalBookings = await prisma.booking.count();

        stats = {
            label1: "Total Users",
            value1: totalUsers,
            label2: "Total Venues",
            value2: totalVenues,
            label3: "Total Bookings",
            value3: totalBookings.toString()
        };
    } else if (role === "FIELD_OWNER") {
        const ownerWithVenues = dbUser as any;
        const myVenuesCount = ownerWithVenues.venues?.length || 0;

        // Calculate bookings across all fields in all venues
        const myBookingsCount = ownerWithVenues.venues?.reduce((acc: number, venue: any) => {
            const venueBookings = venue.fields?.reduce((fAcc: number, field: any) => fAcc + (field.bookings?.length || 0), 0) || 0;
            return acc + venueBookings;
        }, 0) || 0;

        // Calculate revenue
        const revenue = ownerWithVenues.venues?.reduce((acc: number, venue: any) => {
            const venueRevenue = venue.fields?.reduce((fAcc: number, field: any) => {
                const fieldRevenue = field.bookings?.reduce((bAcc: number, booking: any) => bAcc + (booking.totalPrice || 0), 0) || 0;
                return fAcc + fieldRevenue;
            }, 0) || 0;
            return acc + venueRevenue;
        }, 0) || 0;

        stats = {
            label1: "My Bookings",
            value1: myBookingsCount,
            label2: "My Venues",
            value2: myVenuesCount,
            label3: "Revenue",
            value3: `Rp ${revenue.toLocaleString('id-ID')}`
        };
    } else {
        // Player
        const myBookings = await prisma.booking.count({
            where: { userId: user.id }
        });

        stats = {
            label1: "My Bookings",
            value1: myBookings,
            label2: "Matches Played",
            value2: 0, // Placeholder
            label3: "Wallet",
            value3: "Rp 0"
        };
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-slate-400 mt-1">Welcome back, {dbUser.name || "User"}! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 hover:text-white transition">Filter by Date</button>
                    <button className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 transition shadow-lg shadow-green-900/20">Create Booking</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Stats & Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title={stats.label1}
                            value={stats.value1}
                            label="All time"
                            icon={role === "ADMIN" ? Users : Trophy}
                            trend={role === "ADMIN" ? "" : "+24%"}
                            trendUp={true}
                        />
                        <StatsCard
                            title={stats.label2}
                            value={stats.value2}
                            label="Currently active"
                            icon={role === "ADMIN" ? Building2 : Users}
                        />
                        <StatsCard
                            title={stats.label3}
                            value={stats.value3}
                            label="All time"
                            icon={role === "ADMIN" ? Calendar : CreditCard}
                            trend={role === "ADMIN" ? "" : "+12%"}
                            trendUp={true}
                        />
                    </div>

                    {/* Placeholder for Recent Activity or Chart */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center text-slate-500">
                        <p>Activity Chart Placeholder</p>
                        <span className="text-xs mt-2">Charts will be implemented in the next phase</span>
                    </div>
                </div>

                {/* Right Column - Upcoming & Highlights */}
                <div className="space-y-8">
                    <UpcomingMatchCard />

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                    <Trophy size={16} />
                                </div>
                                <span>Create Tournament</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Users size={16} />
                                </div>
                                <span>Add New Member</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
