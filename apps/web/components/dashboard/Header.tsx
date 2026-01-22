"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Search for venues, matches..."
                    className="w-full bg-slate-800 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <button className="relative p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-800"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary border border-slate-700 hover:border-primary transition cursor-pointer">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
