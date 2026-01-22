import { prisma } from "@repo/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const matches = await prisma.match.findMany({
        where: {
            date: {
                gte: new Date()
            }
        },
        include: {
            creator: {
                select: {
                    name: true,
                    email: true,
                    avatarUrl: true
                }
            }
        },
        orderBy: {
            date: 'asc'
        }
    });

    return NextResponse.json(matches);
}
