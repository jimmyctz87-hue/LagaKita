import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function UpcomingMatchCard() {
    // TODO: Fetch real booking data
    const hasBooking = false;

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-1">Next Match</h3>
                        <p className="text-indigo-200 text-sm">Your upcoming schedule</p>
                    </div>
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/10">
                        {hasBooking ? "Confirmed" : "No Schedule"}
                    </div>
                </div>

                {hasBooking ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-center">
                            <div>
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-lg font-bold border border-slate-700 mb-2 mx-auto">
                                    T1
                                </div>
                                <span className="text-sm font-semibold text-white">Team A</span>
                            </div>
                            <div className="text-xl font-black text-slate-500 italic">VS</div>
                            <div>
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-lg font-bold border border-slate-700 mb-2 mx-auto">
                                    T2
                                </div>
                                <span className="text-sm font-semibold text-white">Team B</span>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-indigo-200 text-sm">
                                <Calendar size={14} />
                                <span>Mon, 24 Jan 2026</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-200 text-sm">
                                <Clock size={14} />
                                <span>19:00 - 21:00</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-200 text-sm">
                                <MapPin size={14} />
                                <span>Mega Futsal, Court 1</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-slate-300 mb-6 text-sm">You simply don't have any upcoming matches. Ready to play?</p>
                        <Link href="/explore" className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary hover:bg-green-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-green-900/20">
                            Book a Field Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
