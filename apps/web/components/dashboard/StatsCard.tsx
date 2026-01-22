import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    label?: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatsCard({ title, value, label, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1 group-hover:text-slate-300 transition-colors">{title}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                    {label && <p className="text-slate-500 text-xs mt-1">{label}</p>}
                </div>
                <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-primary/20 group-hover:text-primary transition-colors text-slate-400">
                    <Icon size={24} />
                </div>
            </div>

            {trend && (
                <div className={`flex items-center text-xs font-semibold ${trendUp ? "text-green-400" : "text-red-400"}`}>
                    <span>{trend}</span>
                    <span className="ml-1 text-slate-500 font-normal">from last month</span>
                </div>
            )}
        </div>
    );
}
