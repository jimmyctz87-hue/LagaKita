import { prisma, UserRole } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Script from "next/script";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch db user for role
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    });

    const isOwner = dbUser?.role === UserRole.FIELD_OWNER || dbUser?.role === UserRole.ADMIN;

    return (
        <div className="flex min-h-screen bg-slate-950 text-white font-sans selection:bg-primary/30">
            <Sidebar userRole={dbUser?.role || "PLAYER"} userEmail={user.email || null} />

            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>

            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
        </div>
    );
}
