"use client";

import { useState, useEffect } from "react";
import { createBooking, getFieldBookings } from "@/app/actions/booking";
import { useRouter } from "next/navigation";

export default function BookingWidget({ fields }: { fields: any[] }) {
    const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || "");
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0] || "");
    const [startHour, setStartHour] = useState<number | null>(null);
    const [busySlots, setBusySlots] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (selectedFieldId && date) {
            setLoading(true);
            getFieldBookings(selectedFieldId, date).then(bookings => {
                const busy = new Set<number>();
                bookings.forEach(b => {
                    const start = new Date(b.startTime).getHours();
                    const end = new Date(b.endTime).getHours();
                    for (let i = start; i < end; i++) {
                        busy.add(i);
                    }
                });
                setBusySlots(Array.from(busy));
                setLoading(false);
            });
        }
    }, [selectedFieldId, date]);

    const handleBook = async () => {
        if (!selectedFieldId || !startHour || !date) return;

        const confirmMsg = `Confirm booking for ${date} at ${startHour}:00?`;
        if (!confirm(confirmMsg)) return;

        setLoading(true);
        const res = await createBooking(selectedFieldId, date, startHour, 1); // Duration hardcoded to 1 hour for MVP
        setLoading(false);

        if (res.error) {
            if (res.code === "UNAUTHORIZED") {
                router.push("/login");
            } else {
                alert(res.error);
            }
        } else {
            alert("Booking Created! Redirecting to payment...");
            // router.push(`/payment/${res.bookingId}`); // TODO
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl sticky top-24 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Book a Court</h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm text-slate-400 block mb-1">Select Field</label>
                    <select
                        value={selectedFieldId}
                        onChange={e => setSelectedFieldId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2"
                    >
                        {fields.map((f: any) => (
                            <option key={f.id} value={f.id}>{f.name} - Rp {f.pricePerHour.toLocaleString()}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm text-slate-400 block mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-400 block mb-1">Time Slot (1 Hour)</label>
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 15 }, (_, i) => i + 8).map(hour => { // 8am to 10pm
                            const isBusy = busySlots.includes(hour);
                            const isSelected = startHour === hour;
                            return (
                                <button
                                    key={hour}
                                    disabled={isBusy}
                                    onClick={() => setStartHour(hour)}
                                    className={`text-xs p-2 rounded ${isBusy ? 'bg-red-900/50 text-red-500 cursor-not-allowed' :
                                        isSelected ? 'bg-primary text-black font-bold' :
                                            'bg-slate-700 hover:bg-slate-600'
                                        }`}
                                >
                                    {hour}:00
                                </button>
                            )
                        })}
                    </div>
                </div>

                <button
                    onClick={handleBook}
                    disabled={!selectedFieldId || !startHour || loading}
                    className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-green-400 transition shadow-[0_4px_14px_0_rgba(50,205,50,0.39)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : "Book Now"}
                </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
                Powered by LagaKita Booking Engine
            </p>
        </div>
    );
}
