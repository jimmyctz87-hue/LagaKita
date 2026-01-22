"use client";

import { createVenue } from "@/app/actions/venue";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewVenuePage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await createVenue(formData);
        setLoading(false);

        if (result.success) {
            router.push("/dashboard/venues");
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Venue</h1>

            <form action={handleSubmit} className="space-y-6 bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Venue Name</label>
                    <input
                        name="name"
                        placeholder="e.g. Gor Futsal Merdeka"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Location</label>
                    <input
                        name="location"
                        placeholder="e.g. Jl. Soekarno Hatta No. 123, Bandung"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your venue..."
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Facilities (comma separated)</label>
                    <input
                        name="facilities"
                        placeholder="e.g. Parking, Toilet, Musholla, Canteen"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-green-400 transition"
                    >
                        {loading ? "Creating..." : "Create Venue"}
                    </button>
                </div>
            </form>
        </div>
    );
}
