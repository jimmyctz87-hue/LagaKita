import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Users, Calendar, TrendingUp } from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col relative overflow-hidden selection:bg-primary/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] z-0 pointer-events-none animate-pulse" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-32 px-4 text-center">
        <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Banner */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <Image
                src="/banner1_lagakita.webp"
                alt="LagaKita Banner"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-sm text-primary font-medium mb-4 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Platform Komunitas Olahraga #1 di Indonesia
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
            Main Bola & <span className="text-primary">Padel</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              Gak Pake Ribet.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Satu aplikasi untuk semua kebutuhan olahragamu. Booking lapangan, cari lawan sparring, dan kelola tim dengan mudah.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 w-full max-w-md mx-auto sm:max-w-none">
            <Link href="/explore" className="group relative px-8 py-5 bg-primary text-slate-950 font-bold text-lg rounded-2xl shadow-[0_0_30px_rgba(50,205,50,0.3)] hover:shadow-[0_0_50px_rgba(50,205,50,0.5)] hover:scale-[1.02] transition-all overflow-hidden flex items-center justify-center gap-2">
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Booking Lapang</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/laga/new" className="px-8 py-5 bg-slate-900 border border-slate-800 text-white font-bold text-lg rounded-2xl hover:bg-slate-800 hover:border-slate-700 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              Cari Lawan
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Sports Categories */}
        <div className="mt-24 w-full max-w-6xl mx-auto">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-8">Pilih Olahragamu</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Futsal', color: 'from-orange-500/20 to-red-500/20', border: 'hover:border-orange-500/50' },
              { name: 'Mini Soccer', color: 'from-green-500/20 to-emerald-500/20', border: 'hover:border-green-500/50' },
              { name: 'Badminton', color: 'from-blue-500/20 to-cyan-500/20', border: 'hover:border-blue-500/50' },
              { name: 'Tennis', color: 'from-yellow-500/20 to-amber-500/20', border: 'hover:border-yellow-500/50' },
              { name: 'Padel', color: 'from-pink-500/20 to-rose-500/20', border: 'hover:border-pink-500/50', new: true },
              { name: 'Basket', color: 'from-purple-500/20 to-violet-500/20', border: 'hover:border-purple-500/50' },
            ].map((sport) => (
              <div key={sport.name} className={`relative group p-6 rounded-2xl bg-slate-900 border border-slate-800 ${sport.border} transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <h3 className="font-bold text-white group-hover:scale-105 transition-transform">{sport.name}</h3>
                  {sport.new && <span className="absolute top-0 right-0 text-[10px] font-bold bg-primary text-slate-950 px-2 py-0.5 rounded-bl-lg">NEW</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner CTA Section */}
        <div className="mt-32 w-full max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-12">
              <div className="text-left max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-primary font-bold uppercase tracking-wide">
                  Untuk Pemilik Lapangan
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  Maksimalkan Profit<br />Venue Olahragamu.
                </h2>
                <ul className="space-y-4">
                  {[
                    "Booking System Otomatis 24/7",
                    "Laporan Keuangan & Profit Sharing",
                    "Jangkau Ribuan Komunitas Olahraga"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <ArrowRight size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/partner/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all">
                    Daftar Jadi Mitra
                  </Link>
                </div>
              </div>

              {/* Visual/Illustration Placeholder - Using CSS Shapes for now */}
              <div className="relative w-full md:w-1/2 aspect-video bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-4 shadow-2xl skew-y-1">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs text-slate-500 font-mono">dashboard.lagakita.com</div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800/50">
                    <div className="p-2 bg-primary/20 w-fit rounded-lg mb-2"><TrendingUp size={16} className="text-primary" /></div>
                    <div className="text-2xl font-bold text-white">Rp 15.2M</div>
                    <div className="text-xs text-slate-400">Total Revenue</div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800/50">
                    <div className="p-2 bg-blue-500/20 w-fit rounded-lg mb-2"><Calendar size={16} className="text-blue-500" /></div>
                    <div className="text-2xl font-bold text-white">128</div>
                    <div className="text-xs text-slate-400">Bookings</div>
                  </div>
                  <div className="col-span-2 bg-slate-900 rounded-lg p-4 border border-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800" />
                      <div>
                        <div className="h-2 w-24 bg-slate-800 rounded mb-1" />
                        <div className="h-2 w-16 bg-slate-800 rounded" />
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-bold">New Booking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 text-center border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} LagaKita Indonesia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
