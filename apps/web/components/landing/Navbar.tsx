"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 max-w-7xl mx-auto w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
            <div className="flex items-center gap-3 group cursor-pointer z-50">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                    <span className="font-bold text-slate-950 text-xl">L</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white group-hover:tracking-wide transition-all duration-300">
                    Laga<span className="text-primary">Kita</span>
                </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <Link href="/explore" className="hover:text-white hover:scale-105 transition-all">
                    Cari Lapang
                </Link>
                <Link href="/laga/new" className="hover:text-white hover:scale-105 transition-all">
                    Cari Lawan
                </Link>
                <Link href="/partner/register" className="text-primary hover:text-green-400 font-semibold transition-all">
                    Jadi Mitra
                </Link>
                <Link href="/login" className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Masuk
                </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <Link
                    href="/explore"
                    className="text-2xl font-bold text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                >
                    Cari Lapang
                </Link>
                <Link
                    href="/laga/new"
                    className="text-2xl font-bold text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                >
                    Cari Lawan
                </Link>
                <Link
                    href="/partner/register"
                    className="text-2xl font-bold text-primary hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                >
                    Jadi Mitra
                </Link>
                <Link
                    href="/login"
                    className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 text-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    onClick={() => setIsOpen(false)}
                >
                    Masuk
                </Link>
            </div>
        </nav>
    );
}
