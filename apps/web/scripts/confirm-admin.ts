import { PrismaClient } from "@repo/database";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const prisma = new PrismaClient();

async function confirmAdmin() {
    const email = "admin@lagakita.com";
    console.log(`Manually confirming email for: ${email}`);

    try {
        // raw SQL to update the auth.users table
        // verify if postgres user has permissions, usually yes in Supabase connection string
        const result = await prisma.$executeRaw`
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = ${email};
    `;

        console.log(`Update Result: ${result} row(s) affected.`);
    } catch (error) {
        console.error("Error updating auth.users:", error);
    } finally {
        await prisma.$disconnect();
    }
}

confirmAdmin();
