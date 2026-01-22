import { prisma, SportType } from "@repo/database";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client"; // Client for search/filter if needed, but here using Server Component with searchParams

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: { q?: string; sport?: string };
}) {
    const { q, sport } = await searchParams;

    const venues = await prisma.venue.findMany({
        where: {
            AND: [
                q ? {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { location: { contains: q, mode: 'insensitive' } },
                    ],
                } : {},
                sport ? {
                    fields: {
                        some: {
                            sportType: sport as SportType
                        }
                    }
                } : {}
            ]
        },
        include: {
            fields: {
                select: {
                    pricePerHour: true,
                    sportType: true,
                }
            }
        }
    });

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-primary">Cari Lapang</h1>

                {/* Search & Filter */}
                <form className="mb-8 flex flex-col md:flex-row gap-4">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search by name or location..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-6 py-3 focus:outline-none focus:border-primary"
                    />
                    <select
                        name="sport"
                        defaultValue={sport}
                        className="bg-slate-800 border border-slate-700 rounded-full px-6 py-3 focus:outline-none focus:border-primary appearance-none"
                    >
                        <option value="">All Sports</option>
                        {Object.values(SportType).map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:bg-green-400 transition">
                        Search
                    </button>
                </form>

                {/* Results */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map(venue => {
                        const minPrice = Math.min(...venue.fields.map(f => f.pricePerHour));
                        const distinctSports = Array.from(new Set(venue.fields.map(f => f.sportType)));

                        return (
                            <Link key={venue.id} href={`/venue/${venue.slug}`} className="block group">
                                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-primary transition duration-300">
                                    <div className="h-48 bg-slate-700 relative">
                                        {/* Placeholder Image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                            [Image Placeholder]
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition">{venue.name}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{venue.location}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {distinctSports.map(s => (
                                                <span key={s} className="text-xs font-semibold px-2 py-1 bg-slate-900 rounded text-slate-300">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-end border-t border-slate-700 pt-4">
                                            <div>
                                                <span className="text-xs text-slate-500 block">Starts from</span>
                                                <span className="font-bold text-primary">
                                                    {minPrice !== Infinity ? `Rp ${minPrice.toLocaleString()}` : "Price not set"}
                                                    <span className="text-xs text-white font-normal"> / hour</span>
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-300 group-hover:translate-x-1 transition-transform">
                                                Book Now &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {venues.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-slate-500">No venues found matching your criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
