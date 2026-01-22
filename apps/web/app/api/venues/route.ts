import { prisma } from "@repo/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const venues = await prisma.venue.findMany({
        include: {
            fields: {
                select: {
                    pricePerHour: true,
                    sportType: true
                }
            }
        }
    });

    return NextResponse.json(venues);
}
