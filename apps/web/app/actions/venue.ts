"use server";

import { prisma } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createVenue(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const facilities = (formData.get("facilities") as string || "").split(",").map(f => f.trim());

    // Simple slug generation
    const slug = name.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString().slice(-4);

    try {
        // Check if user exists in our DB, if not create them (sync)
        let dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email!,
                    role: "FIELD_OWNER", // Default to owner for dashboard users
                }
            });
        }

        await prisma.venue.create({
            data: {
                name,
                location,
                description,
                slug,
                ownerId: dbUser.id,
                facilities
            }
        });

        revalidatePath("/dashboard/venues");
        return { success: true };
    } catch (error) {
        console.error("Error creating venue:", error);
        return { error: "Failed to create venue" };
    }
}
