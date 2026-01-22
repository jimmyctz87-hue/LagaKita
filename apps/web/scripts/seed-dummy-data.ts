import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@repo/database";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const prisma = new PrismaClient();

async function seedDummyData() {
    console.log("Starting dummy data seeding...");

    // Dummy users data
    const dummyUsers = [
        { email: "player1@lagakita.com", password: "123456", name: "Budi Santoso", role: "PLAYER", phone: "081234567890" },
        { email: "player2@lagakita.com", password: "123456", name: "Andi Wijaya", role: "PLAYER", phone: "081234567891" },
        { email: "owner1@lagakita.com", password: "123456", name: "Rudi Hermawan", role: "FIELD_OWNER", phone: "081234567892" },
        { email: "owner2@lagakita.com", password: "123456", name: "Dewi Kusuma", role: "FIELD_OWNER", phone: "081234567893" },
        { email: "player3@lagakita.com", password: "123456", name: "Siti Rahayu", role: "PLAYER", phone: "081234567894" },
    ];

    const createdUsers: any[] = [];

    // Create users
    for (const userData of dummyUsers) {
        console.log(`Creating user: ${userData.email}`);

        // Try to sign up
        const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
        });

        let userId: string | undefined;

        if (data?.user) {
            userId = data.user.id;
            console.log(`  ✓ Auth user created: ${userId}`);
        } else {
            // Try to fetch from DB if already exists
            const result: any[] = await prisma.$queryRaw`SELECT id FROM auth.users WHERE email = ${userData.email}`;
            if (result.length > 0) {
                userId = result[0].id;
                console.log(`  ✓ Auth user exists: ${userId}`);
            }
        }

        if (!userId) {
            console.log(`  ✗ Failed to get user ID for ${userData.email}`);
            continue;
        }

        // Upsert Prisma user
        const dbUser = await prisma.user.upsert({
            where: { email: userData.email },
            update: { role: userData.role as any, name: userData.name, phone: userData.phone },
            create: {
                id: userId,
                email: userData.email,
                name: userData.name,
                role: userData.role as any,
                phone: userData.phone,
            },
        });

        createdUsers.push(dbUser);
        console.log(`  ✓ DB user created: ${dbUser.name}`);
    }

    // Create venues for field owners
    const owners = createdUsers.filter((u) => u.role === "FIELD_OWNER");
    const venues = [
        { name: "GOR Ragunan Futsal", location: "Jakarta Selatan", ownerId: owners[0]?.id },
        { name: "Senayan Sports Hub", location: "Jakarta Pusat", ownerId: owners[1]?.id },
        { name: "BSD Sportsplex", location: "Tangerang", ownerId: owners[0]?.id },
    ];

    const createdVenues: any[] = [];
    for (const venueData of venues) {
        if (!venueData.ownerId) continue;

        const venue = await prisma.venue.create({
            data: {
                name: venueData.name,
                location: venueData.location,
                ownerId: venueData.ownerId,
                slug: venueData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            },
        });
        createdVenues.push(venue);
        console.log(`✓ Venue created: ${venue.name}`);

        // Create fields for each venue
        const fieldTypes = ["FUTSAL", "MINI_SOCCER", "BADMINTON"];
        for (let i = 0; i < 3; i++) {
            const field = await prisma.field.create({
                data: {
                    venueId: venue.id,
                    name: `Lapangan ${i + 1}`,
                    sportType: fieldTypes[i] as any,
                    pricePerHour: 150000 + i * 50000,
                },
            });
            console.log(`  ✓ Field created: ${field.name}`);
        }
    }

    // Create bookings
    const players = createdUsers.filter((u) => u.role === "PLAYER");
    const allFields = await prisma.field.findMany();

    for (let i = 0; i < 10; i++) {
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        const randomField = allFields[Math.floor(Math.random() * allFields.length)];

        if (!randomPlayer || !randomField) continue;

        const startTime = new Date();
        startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 7));
        startTime.setHours(10 + i, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 2);

        await prisma.booking.create({
            data: {
                userId: randomPlayer.id,
                fieldId: randomField.id,
                startTime,
                endTime,
                totalPrice: randomField.pricePerHour * 2,
                status: ["PENDING", "CONFIRMED", "COMPLETED"][Math.floor(Math.random() * 3)] as any,
            },
        });
        console.log(`✓ Booking created for ${randomPlayer.name}`);
    }

    console.log("\n✅ Dummy data seeded successfully!");
}

seedDummyData()
    .catch((e) => console.error("Error:", e))
    .finally(async () => {
        await prisma.$disconnect();
    });
