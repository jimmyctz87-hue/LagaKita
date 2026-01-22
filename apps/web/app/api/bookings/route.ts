import { prisma } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();

    // Check for Authorization header (Mobile)
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data } = await supabase.auth.getUser(token);
        user = data.user;
    } else {
        // Fallback to Cookies (Web)
        const { data } = await supabase.auth.getUser();
        user = data.user;
    }

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
        where: {
            userId: user.id
        },
        include: {
            field: {
                include: {
                    venue: true
                }
            }
        },
        orderBy: {
            startTime: 'desc'
        }
    });

    return NextResponse.json(bookings);
}
