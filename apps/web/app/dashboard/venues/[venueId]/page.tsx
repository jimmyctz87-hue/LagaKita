import { prisma } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function VenueDetailPage({ params }: { params: { venueId: string } }) {
    const { venueId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const venue = await prisma.venue.findUnique({
        where: { id: venueId },
        include: {
            fields: true
        }
    });

    if (!venue || venue.ownerId !== user.id) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <Link href="/dashboard/venues" className="text-slate-400 hover:text-white mb-2 inline-block">
                    &larr; Back to Venues
                </Link>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{venue.name}</h1>
                        <p className="text-slate-400">{venue.location}</p>
                    </div>
                    <Link href={`/dashboard/venues/${venueId}/fields/new`} className="px-4 py-2 bg-primary text-black font-semibold rounded hover:bg-green-400">
                        + Add Field
                    </Link>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8">
                <h2 className="text-xl font-bold mb-4">Venue Details</h2>
                <p className="text-slate-300 mb-2">{venue.description || "No description provided."}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {venue.facilities.map((facility, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-400 border border-slate-700">
                            {facility}
                        </span>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Fields (Courts)</h2>

            {venue.fields.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700 text-slate-400">
                    <p className="mb-4">No fields added to this venue yet.</p>
                    <Link href={`/dashboard/venues/${venueId}/fields/new`} className="text-primary hover:underline">
                        Add your first field
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {venue.fields.map(field => (
                        <div key={field.id} className="p-4 bg-slate-800 rounded border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{field.name}</h3>
                                <span className="text-xs px-2 py-1 bg-blue-900 text-blue-200 rounded">{field.sportType}</span>
                            </div>
                            <p className="text-slate-300">Rp {field.pricePerHour.toLocaleString()} / hour</p>
                            <div className="mt-4 flex gap-2">
                                <button className="text-sm text-slate-400 hover:text-white">Edit Schedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
