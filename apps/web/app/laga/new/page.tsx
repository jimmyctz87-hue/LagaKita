"use client";

import { createMatch } from "@/app/actions/match";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SportType } from "@repo/database";

export default function NewMatchPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await createMatch(formData);
        setLoading(false);

        if (result.success) {
            router.push("/laga");
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h1 className="text-3xl font-bold mb-6 text-primary">Create New Match</h1>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Match Title</label>
                        <input
                            name="title"
                            placeholder="e.g. Sparring Futsal Fun"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">Sport</label>
                            <select
                                name="sportType"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                                required
                            >
                                {Object.values(SportType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">Max Players</label>
                            <input
                                name="maxPlayers"
                                type="number"
                                placeholder="10"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Location</label>
                        <input
                            name="location"
                            placeholder="e.g. Gor C-Tra Arena"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">Date</label>
                            <input
                                name="date"
                                type="date"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">Time</label>
                            <input
                                name="time"
                                type="time"
                                className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Description</label>
                        <textarea
                            name="description"
                            placeholder="Additional info..."
                            rows={3}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-green-400 transition mt-4"
                    >
                        {loading ? "Creating..." : "Create Match"}
                    </button>
                </form>
            </div>
        </div>
    );
}
