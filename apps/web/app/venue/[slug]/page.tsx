import { prisma } from "@repo/database";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingWidget from "@/components/BookingWidget";

export default async function VenuePublicPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const venue = await prisma.venue.findUnique({
        where: { slug },
        include: {
            fields: true
        }
    });

    if (!venue) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Hero / Header */}
            <div className="h-64 md:h-80 bg-slate-800 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{venue.name}</h1>
                    <p className="text-slate-300 text-lg md:text-xl flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {venue.location}
                    </p>
                </div>
            </div>

            <div className="container mx-auto p-6 grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">About Venue</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {venue.description || "No description available."}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                        <div className="flex flex-wrap gap-3">
                            {venue.facilities.map((f, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 font-medium">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Available Fields</h2>
                        <div className="space-y-4">
                            {venue.fields.map(field => (
                                <div key={field.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center group hover:border-primary transition">
                                    <div>
                                        <h3 className="font-bold text-lg">{field.name}</h3>
                                        <span className="text-sm text-slate-400">{field.sportType}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-primary">Rp {field.pricePerHour.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">per hour</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Booking Sidebar */}
                <div className="md:col-span-1">
                    <BookingWidget fields={venue.fields} />
                </div>
            </div>
        </div>
    );
}
