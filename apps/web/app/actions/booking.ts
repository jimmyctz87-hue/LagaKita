"use server";

import { prisma, BookingStatus } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(fieldId: string, date: string, startHour: number, duration: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Return error or special code to trigger login
        return { error: "Please login to book", code: "UNAUTHORIZED" };
    }

    // Calculate start and end times
    const startTime = new Date(`${date}T${startHour.toString().padStart(2, '0')}:00:00`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    try {
        // 1. Check Field existence and price
        const field = await prisma.field.findUnique({
            where: { id: fieldId },
        });

        if (!field) return { error: "Field not found" };

        // 2. Check Overlap
        const overlap = await prisma.booking.findFirst({
            where: {
                fieldId,
                status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
                OR: [
                    {
                        startTime: { lt: endTime },
                        endTime: { gt: startTime },
                    }
                ]
            }
        });

        if (overlap) {
            return { error: "Slot already booked" };
        }

        // 3. Create Booking
        const totalPrice = field.pricePerHour * duration;

        // Ensure user exists in our DB
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (!dbUser) {
            // Create user if missing (should be handled in auth callback ideally, but safe fallback)
            await prisma.user.create({
                data: { id: user.id, email: user.email! }
            })
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                fieldId,
                startTime,
                endTime,
                totalPrice,
                status: BookingStatus.PENDING,
            }
        });

        return { success: true, bookingId: booking.id };

    } catch (error) {
        console.error("Booking error:", error);
        return { error: "Failed to create booking" };
    }
}

export async function getFieldBookings(fieldId: string, date: string) {
    // Get all bookings for a specific date to disable slots in UI
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const bookings = await prisma.booking.findMany({
        where: {
            fieldId,
            status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
            startTime: {
                gte: startOfDay,
                lte: endOfDay
            }
        },
        select: {
            startTime: true,
            endTime: true,
        }
    });

    return bookings;
}
