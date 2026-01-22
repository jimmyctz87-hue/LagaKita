"use client";

import { createField } from "@/app/actions/field";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { SportType } from "@repo/database";

export default function NewFieldPage({ params }: { params: Promise<{ venueId: string }> }) {
    const { venueId } = use(params);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await createField(venueId, formData);
        setLoading(false);

        if (result.success) {
            router.push(`/dashboard/venues/${venueId}`);
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Field</h1>

            <form action={handleSubmit} className="space-y-6 bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Field Name</label>
                    <input
                        name="name"
                        placeholder="e.g. Lapangan 1 (Vinyl)"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Sport Type</label>
                    <select
                        name="sportType"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        required
                    >
                        {Object.values(SportType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Price per Hour (Rp)</label>
                    <input
                        name="pricePerHour"
                        type="number"
                        placeholder="e.g. 150000"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 focus:border-primary focus:outline-none"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-green-400 transition"
                    >
                        {loading ? "Adding Field..." : "Add Field"}
                    </button>
                </div>
            </form>
        </div>
    );
}
