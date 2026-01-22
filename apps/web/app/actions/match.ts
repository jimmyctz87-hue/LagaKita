"use server";

import { prisma, SportType } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMatch(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string; // "14:00"
    const sportType = formData.get("sportType") as SportType;
    const maxPlayers = parseInt(formData.get("maxPlayers") as string);
    const pricePerPlayer = parseInt(formData.get("pricePerPlayer") as string || "0");

    const matchDate = new Date(`${date}T${time}:00`);

    try {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (!dbUser) {
            await prisma.user.create({ data: { id: user.id, email: user.email! } });
        }

        await prisma.match.create({
            data: {
                title,
                description,
                location,
                date: matchDate,
                sportType,
                maxPlayers,
                pricePerPlayer,
                creatorId: user.id
            }
        });

        revalidatePath("/laga");
        return { success: true };
    } catch (error) {
        console.error("Match error:", error);
        return { error: "Failed to create match" };
    }
}
