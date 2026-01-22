import { Trophy, Plus, Calendar } from "lucide-react";

export default function LeaguesPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
                    <p className="text-slate-400 mt-1">Organize and manage competitive leagues.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 transition shadow-lg shadow-green-900/20">
                    <Plus size={18} />
                    <span>Create League</span>
                </button>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900 border border-slate-800 border-dashed rounded-3xl text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <Trophy size={40} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Active Leagues</h3>
                <p className="text-slate-400 max-w-sm mb-8">
                    You haven't created any leagues yet. Start a new competition to engage your community.
                </p>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition">
                        View Archive
                    </button>
                    <button className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-green-400 transition">
                        New League
                    </button>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-bold text-white mb-6">Upcoming Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4">
                            <Calendar size={20} />
                        </div>
                        <h4 className="font-bold text-white mb-2">Automated Scheduling</h4>
                        <p className="text-sm text-slate-400">Generate fixtures automatically based on team availability and venue slots.</p>
                    </div>
                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-4">
                            <Trophy size={20} />
                        </div>
                        <h4 className="font-bold text-white mb-2">Standings & Stats</h4>
                        <p className="text-sm text-slate-400">Real-time table updates, top scorers, and detailed match statistics.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
