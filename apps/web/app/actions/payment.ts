"use server";

import { prisma, BookingStatus } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { snap } from "@/lib/midtrans";
import { redirect } from "next/navigation";

export async function processPayment(bookingId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                field: {
                    include: {
                        venue: true
                    }
                },
                user: true
            }
        });

        if (!booking) return { error: "Booking not found" };
        if (booking.status === BookingStatus.CONFIRMED) return { error: "Already paid" };

        // Create Snap Transaction
        const parameter = {
            transaction_details: {
                order_id: `BOOKING-${booking.id}-${Math.floor(Math.random() * 1000)}`,
                gross_amount: booking.totalPrice,
            },
            customer_details: {
                first_name: user.email?.split('@')[0],
                email: user.email
            },
            item_details: [{
                id: booking.field.id,
                price: booking.totalPrice,
                quantity: 1,
                name: `${booking.field.venue.name} - ${booking.field.name}`
            }]
        };

        const transaction = await snap.createTransaction(parameter);

        return {
            success: true,
            token: transaction.token,
            redirect_url: transaction.redirect_url
        };

    } catch (error) {
        console.error("Payment error:", error);
        return { error: "Failed to initiate payment" };
    }
}
