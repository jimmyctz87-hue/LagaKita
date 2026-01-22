import { prisma } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function VenuesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check user role
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    });

    const isAdmin = dbUser?.role === "ADMIN";

    const venues = await prisma.venue.findMany({
        where: isAdmin ? {} : {
            ownerId: user.id,
        },
        include: {
            owner: {
                select: {
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{isAdmin ? "All Venues" : "My Venues"}</h1>
                {!isAdmin && (
                    <Link href="/dashboard/venues/new" className="px-4 py-2 bg-primary text-black font-semibold rounded hover:bg-green-400">
                        + Add Venue
                    </Link>
                )}
            </div>

            {venues.length === 0 ? (
                <div className="text-center py-20 bg-slate-800 rounded-lg border border-slate-700 text-slate-400">
                    <p className="mb-4">{isAdmin ? "No venues in the system yet." : "You haven't added any venues yet."}</p>
                    {!isAdmin && (
                        <Link href="/dashboard/venues/new" className="text-primary hover:underline">
                            Create your first venue
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {venues.map((venue) => (
                        <div key={venue.id} className="p-6 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center hover:border-primary transition">
                            <div>
                                <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                                <p className="text-slate-400 text-sm">{venue.location}</p>
                                {isAdmin && (venue as any).owner && (
                                    <p className="text-slate-500 text-xs mt-1">Owner: {(venue as any).owner.name || (venue as any).owner.email}</p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/dashboard/venues/${venue.id}`} className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 text-sm">
                                    {isAdmin ? "View" : "Manage"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
