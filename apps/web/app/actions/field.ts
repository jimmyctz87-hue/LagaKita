"use server";

import { prisma, SportType } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createField(venueId: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const name = formData.get("name") as string;
    const sportType = formData.get("sportType") as SportType;
    const pricePerHour = parseInt(formData.get("pricePerHour") as string);

    try {
        // Verify ownership
        const venue = await prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue || venue.ownerId !== user.id) {
            return { error: "Unauthorized" };
        }

        await prisma.field.create({
            data: {
                venueId,
                name,
                sportType,
                pricePerHour,
            }
        });

        revalidatePath(`/dashboard/venues/${venueId}`);
        return { success: true };
    } catch (error) {
        console.error("Error creating field:", error);
        return { error: "Failed to create field" };
    }
}
