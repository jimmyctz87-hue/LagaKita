"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma, UserRole } from "@repo/database";
import { redirect } from "next/navigation";

export async function registerPartner(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const venueName = formData.get("venueName") as string;
    const phone = formData.get("phone") as string;

    if (!email || !password || !name || !venueName) {
        return { error: "Please fill in all required fields" };
    }

    const supabase = await createClient();

    // 1. Sign up with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: "FIELD_OWNER",
            },
        },
    });

    if (authError) {
        console.error("Supabase SignUp Error:", authError);
        return { error: authError.message };
    }

    if (!authData.user) {
        return { error: "Failed to create user account" };
    }

    try {
        // 2. Create User in Prisma
        // Check if user exists (might be created by trigger or not users yet)
        // We'll try to upsert to be safe
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                role: UserRole.FIELD_OWNER,
                name: name,
                phone: phone,
            },
            create: {
                id: authData.user.id, // Important: Sync IDs
                email: email,
                name: name,
                role: UserRole.FIELD_OWNER,
                phone: phone,
            },
        });

        // 3. Create Venue
        const slug = venueName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);

        await prisma.venue.create({
            data: {
                name: venueName,
                ownerId: user.id,
                slug: slug,
                location: "Jakarta", // Default for now
            },
        });

    } catch (dbError) {
        console.error("Database Error:", dbError);
        // Determine if we should delete the supabase user here for consistency
        // For now, let's just return error
        return { error: "Failed to create field owner profile in database" };
    }

    // 4. Redirect
    redirect("/dashboard");
}
