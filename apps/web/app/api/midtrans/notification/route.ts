import { prisma, BookingStatus } from "@repo/database";
import { coreApi } from "@/lib/midtrans";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const notificationJson = await request.json();

        // Validate signature via Core API
        const statusResponse = await coreApi.transaction.notification(notificationJson);
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction Status: ${transactionStatus}. Fraud Status: ${fraudStatus}`);

        // Parse booking ID from order_id (format: BOOKING-{id}-{random})
        const bookingId = orderId.split('-')[1];

        if (!bookingId) {
            return NextResponse.json({ error: "Invalid Order ID" }, { status: 400 });
        }

        let newStatus: BookingStatus | undefined;

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                // Fraud status challenge: keep pending or set to PENDING explicitly
                newStatus = BookingStatus.PENDING;
            } else if (fraudStatus == 'accept') {
                newStatus = BookingStatus.CONFIRMED;
            }
        } else if (transactionStatus == 'settlement') {
            newStatus = BookingStatus.CONFIRMED;
        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            newStatus = BookingStatus.CANCELLED;
        } else if (transactionStatus == 'pending') {
            newStatus = BookingStatus.PENDING; // Keep pending
        }

        if (newStatus) {
            await prisma.booking.update({
                where: { id: bookingId },
                data: { status: newStatus }
            });
        }

        return NextResponse.json({ status: "OK" });

    } catch (error) {
        console.error("Midtrans Notification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
