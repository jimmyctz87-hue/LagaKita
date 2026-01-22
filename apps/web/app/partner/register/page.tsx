"use client";

import Link from "next/link";
import { ArrowLeft, Building2, User, Mail, Lock, Phone, AlertCircle } from "lucide-react";
import { useActionState } from "react";
import { registerPartner } from "./actions";

export default function PartnerRegisterPage() {
    const [state, action, isPending] = useActionState(registerPartner, null);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans flex relative overflow-hidden">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-20" />
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6 text-white">Partner LagaKita</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Bergabung dengan ribuan pemilik lapangan lainnya. Kelola bisnis lapangan olahragamu dengan teknologi modern.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Dashboard Analytics Lengkap",
                            "Manajemen Booking Otomatis",
                            "Sistem Pembayaran Terintegrasi",
                            "Marketing & Promosi Gratis"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">✓</div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">
                <Link href="/" className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 text-slate-500 hover:text-white transition">
                    <ArrowLeft size={16} />
                    <span>Kembali</span>
                </Link>

                <div className="max-w-md w-full mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Daftar sebagai Mitra</h1>
                        <p className="text-slate-400">Isi data di bawah untuk mulai mengelola venuemu.</p>
                    </div>

                    {state?.error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{state.error}</span>
                        </div>
                    )}

                    <form action={action} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input name="name" type="text" placeholder="John Doe" required className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Nama Venue / Lapangan</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input name="venueName" type="text" placeholder="Mega Futsal Jakarta" required className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email Bisnis</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="email" type="email" placeholder="email@venue.com" required className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">No. WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="phone" type="tel" placeholder="0812..." required className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input name="password" type="password" placeholder="••••••••" required className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-4 bg-primary text-slate-950 font-bold rounded-xl hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(50,205,50,0.3)] hover:shadow-[0_0_30px_rgba(50,205,50,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    "Daftar Sekarang"
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-8">
                        Sudah punya akun mitra? <Link href="/login" className="text-primary hover:text-white transition">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
