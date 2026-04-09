import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'amber' | 'rose';
  delay?: number;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    border: 'border-blue-100',
    glow: 'hover:shadow-blue-100',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100 text-emerald-600',
    border: 'border-emerald-100',
    glow: 'hover:shadow-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    border: 'border-amber-100',
    glow: 'hover:shadow-amber-100',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'bg-rose-100 text-rose-600',
    border: 'border-rose-100',
    glow: 'hover:shadow-rose-100',
  },
};

export default function StatsCard({ label, value, change, changeLabel, icon, color, delay = 0 }: StatsCardProps) {
  const c = colorMap[color];
  const isPositive = change >= 0;

  return (
    <div
      className={`bg-white rounded-2xl p-5 border ${c.border} hover:shadow-xl ${c.glow} transition-all duration-300 cursor-pointer group animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="text-slate-400 text-xs mt-1">{changeLabel}</p>
    </div>
  );
}
