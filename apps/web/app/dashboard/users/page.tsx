import { prisma } from "@repo/database";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Mail, Phone, Shield, User as UserIcon } from "lucide-react";

export default async function UsersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    });

    if (!dbUser || dbUser.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
                    <p className="text-slate-400 mt-1">View and manage all registered users.</p>
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 text-sm font-medium">
                    Total Users: {users.length}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">User</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Role</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {users.map((u) => (
                                <tr key={u.id} className="group hover:bg-slate-800/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/20 group-hover:text-primary transition">
                                                <UserIcon size={18} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{u.name || "Unnamed"}</div>
                                                <div className="text-sm text-slate-500 truncate max-w-[150px]">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${u.role === "ADMIN"
                                                ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                                : u.role === "FIELD_OWNER"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            }`}>
                                            {u.role === "ADMIN" && <Shield size={10} />}
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Mail size={14} />
                                                <span>{u.email}</span>
                                            </div>
                                            {u.phone && (
                                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                                    <Phone size={14} />
                                                    <span>{u.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-white font-medium text-sm">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
