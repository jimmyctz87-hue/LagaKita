"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);
        if (error) {
            alert("Error logging in: " + error.message);
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        setLoading(false);
        if (error) {
            alert("Error signing up: " + error.message);
        } else {
            alert("Check your email for the confirmation link!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary text-white">
            <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                    Masuk ke LagaKita
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-primary text-black font-bold rounded hover:bg-green-400 transition"
                    >
                        {loading ? "Loading..." : "Masuk"}
                    </button>
                </form>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleSignUp}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Belum punya akun? Daftar
                    </button>
                </div>
            </div>
        </div>
    );
}
