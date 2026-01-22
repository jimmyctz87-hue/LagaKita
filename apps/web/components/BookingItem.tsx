"use client";

import { useState } from "react";
import { processPayment } from "@/app/actions/payment";

export default function BookingItem({ booking, isOwner }: { booking: any, isOwner: boolean }) {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        const result = await processPayment(booking.id);

        if (result.error) {
            alert(result.error);
            setLoading(false);
            return;
        }

        if (result.token) {
            window.snap.pay(result.token, {
                onSuccess: function (result: any) {
                    const params = new URLSearchParams({
                        order_id: result.order_id,
                        status_code: result.status_code,
                        transaction_status: result.transaction_status
                    });
                    window.location.href = `/payment/status?${params.toString()}`;
                },
                onPending: function (result: any) {
                    const params = new URLSearchParams({
                        order_id: result.order_id,
                        status_code: result.status_code,
                        transaction_status: result.transaction_status
                    });
                    window.location.href = `/payment/status?${params.toString()}`;
                },
                onError: function (result: any) {
                    const params = new URLSearchParams({
                        order_id: result.order_id,
                        status_code: result.status_code,
                        transaction_status: result.transaction_status
                    });
                    window.location.href = `/payment/status?${params.toString()}`;
                },
                onClose: function () {
                    // Do nothing or maybe reload to clear loading state
                    setLoading(false);
                }
            })
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${booking.status === 'PENDING' ? 'bg-yellow-900/50 text-yellow-500' :
                        booking.status === 'CONFIRMED' ? 'bg-green-900/50 text-green-500' :
                            'bg-slate-700 text-slate-400'
                        }`}>
                        {booking.status}
                    </span>
                    <span className="text-sm text-slate-400">
                        {new Date(booking.startTime).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                    {booking.field.venue.name} - {booking.field.name}
                </h3>
                <p className="text-slate-400 text-sm">
                    {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                    {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {isOwner && (
                    <p className="text-sm text-primary mt-1">Booked by: {booking.user.name || booking.user.email}</p>
                )}
            </div>

            <div className="mt-4 md:mt-0 text-right">
                <p className="text-xl font-bold text-white">Rp {booking.totalPrice.toLocaleString()}</p>
                {!isOwner && booking.status === 'PENDING' && (
                    <button
                        onClick={handlePay}
                        disabled={loading}
                        className="mt-2 px-4 py-2 bg-primary text-black font-bold text-sm rounded hover:bg-green-400 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                )}
            </div>
        </div>
    )
}
