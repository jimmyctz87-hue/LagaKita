import Link from "next/link";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

export default function PaymentStatusPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const status = searchParams.transaction_status as string;
    // const orderId = searchParams.order_id as string;
    // const bookingId = orderId?.split('-')[1];

    let content = {
        title: "Payment Status Unknown",
        message: "We could not determine the status of your payment.",
        icon: <AlertTriangle className="w-16 h-16 text-gray-400" />,
        color: "text-gray-400"
    };

    if (status === 'capture' || status === 'settlement') {
        content = {
            title: "Payment Successful!",
            message: "Thank you for your booking. You can now view your booking details in the dashboard.",
            icon: <CheckCircle className="w-16 h-16 text-primary" />,
            color: "text-primary"
        };
    } else if (status === 'pending') {
        content = {
            title: "Payment Pending",
            message: "We are waiting for your payment. Please complete it as soon as possible.",
            icon: <Clock className="w-16 h-16 text-yellow-500" />,
            color: "text-yellow-500"
        };
    } else if (status === 'deny' || status === 'cancel' || status === 'expire') {
        content = {
            title: "Payment Failed",
            message: "Your payment was failed or cancelled. Please try again.",
            icon: <XCircle className="w-16 h-16 text-red-500" />,
            color: "text-red-500"
        };
    }

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full text-center shadow-xl">
                <div className="flex justify-center mb-6">
                    {content.icon}
                </div>

                <h1 className={`text-2xl font-bold mb-2 ${content.color}`}>
                    {content.title}
                </h1>

                <p className="text-slate-400 mb-8">
                    {content.message}
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/dashboard/bookings"
                        className="w-full py-3 bg-primary text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
                    >
                        Go to My Bookings
                    </Link>

                    <Link
                        href="/explore"
                        className="w-full py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        Book Another Field
                    </Link>
                </div>
            </div>
        </div>
    );
}
