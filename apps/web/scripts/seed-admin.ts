import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@repo/database";
import * as dotenv from "dotenv";

// Load .env from apps/web (where we run it)
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials in .env file");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    }
});

const prisma = new PrismaClient();

async function seedAdmin() {
    const email = "admin@lagakita.com";
    const password = "000000";
    const name = "Super Admin";

    console.log(`Seeding admin user: ${email}`);

    let userId: string | undefined;

    // 1. Try to Sign Up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name, role: "ADMIN" }
        }
    });

    if (error) {
        console.log("SignUp message:", error.message);
    }

    if (data?.user) {
        userId = data.user.id;
        console.log("User created/retrieved from Auth:", userId);
    } else {
        // If user exists, we might not get it back via signUp if it's already registered.
        // Try to fetch ID via Raw SQL
        console.log("User might already exist. Attempting to fetch ID from DB...");
        try {
            const result: any[] = await prisma.$queryRaw`SELECT id FROM auth.users WHERE email = ${email}`;
            if (result && result.length > 0) {
                userId = result[0].id;
                console.log("User ID retrieved via DB:", userId);
            } else {
                console.log("User not found in auth.users via SQL.");
            }
        } catch (dbError) {
            console.error("Could not query auth.users:", dbError);
        }
    }

    if (!userId) {
        console.error("Failed to obtain User ID. Cannot seed Prisma.");
        return;
    }

    // 2. Upsert Prisma User
    try {
        const dbUser = await prisma.user.upsert({
            where: { email },
            update: {
                role: "ADMIN",
                name: name
            },
            create: {
                id: userId,
                email: email,
                name: name,
                role: "ADMIN"
            }
        });
        console.log("Prisma Admin user upserted:", dbUser.id);
    } catch (dbError) {
        console.error("Prisma Error:", dbError);
    }

    console.log("Done.");
}

seedAdmin()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
