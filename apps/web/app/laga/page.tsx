import { prisma, SportType } from "@repo/database"; // eslint-disable-line
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function LagaPage() {
    const matches = await prisma.match.findMany({
        where: {
            date: {
                gte: new Date()
            }
        },
        include: {
            creator: true
        },
        orderBy: {
            date: 'asc'
        }
    });

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Cari Lawan / Laga</h1>
                        <p className="text-slate-400">Join upcoming matches or find a sparring partner.</p>
                    </div>
                    <Link href="/laga/new" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition">
                        + Create Match
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map(match => (
                        <div key={match.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary transition group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 font-bold border border-slate-600">
                                    {match.sportType}
                                </span>
                                <div className="text-right">
                                    <p className="font-bold text-primary">{new Date(match.date).toLocaleDateString()}</p>
                                    <p className="text-xs text-slate-400">{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{match.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                {match.location}
                            </p>

                            <div className="flex justify-between items-end border-t border-slate-700 pt-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
                                        {match.creator.name?.[0] || match.creator.email?.[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-sm text-slate-300">{match.creator.name || "User"}</span>
                                </div>
                                <button className="text-sm font-bold text-black bg-primary px-4 py-2 rounded-lg hover:bg-green-400 transition">
                                    Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {matches.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-slate-500">No upcoming matches. Be the first to create one!</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
