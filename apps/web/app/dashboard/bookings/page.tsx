import { prisma, UserRole } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookingItem from "@/components/BookingItem";

export default async function BookingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return <div>User not found</div>;

    const isOwner = dbUser.role === UserRole.FIELD_OWNER;

    const bookings = await prisma.booking.findMany({
        where: isOwner ? {
            field: {
                venue: {
                    ownerId: user.id
                }
            }
        } : {
            userId: user.id
        },
        include: {
            field: {
                include: {
                    venue: true
                }
            },
            user: true // Check who booked (for owner)
        },
        orderBy: {
            startTime: 'desc'
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{isOwner ? "Incoming Bookings" : "My Bookings"}</h1>

            <div className="space-y-4">
                {bookings.length === 0 && (
                    <div className="text-slate-400">No bookings found.</div>
                )}
                {bookings.map(booking => (
                    <BookingItem key={booking.id} booking={booking} isOwner={isOwner} />
                ))}
            </div>
        </div>
    );
}
