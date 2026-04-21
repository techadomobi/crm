export interface RevenuePoint {
  month: string;
  value: number;
}

interface RevenueChartProps {
  data?: RevenuePoint[];
  title?: string;
  subtitle?: string;
  trendLabel?: string;
  totalLabel?: string;
}

export default function RevenueChart({
  data = [],
  title = 'Revenue Overview',
  subtitle = 'Oct 2025 – Apr 2026',
  trendLabel,
  totalLabel = 'Total this period',
}: RevenueChartProps) {
  const fallbackSeries: RevenuePoint[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
    month: day,
    value: 0,
  }));
  const chartData = data.length > 0 ? data : fallbackSeries;

  const firstPoint = chartData[0]?.value ?? 0;
  const lastPoint = chartData[chartData.length - 1]?.value ?? 0;
  const delta = lastPoint - firstPoint;
  const deltaPercent = firstPoint > 0 ? (delta / firstPoint) * 100 : 0;
  const isUpTrend = delta >= 0;
  const computedTrendLabel =
    trendLabel ??
    (firstPoint > 0
      ? `${isUpTrend ? '+' : ''}${deltaPercent.toFixed(1)}% vs first point`
      : 'Insufficient baseline');
  const trendClassName = isUpTrend
    ? 'text-emerald-600 bg-emerald-50'
    : 'text-rose-600 bg-rose-50';

  const max = Math.max(...chartData.map(d => d.value));
  const min = Math.min(...chartData.map(d => d.value));
  const range = Math.max(max - min, 1);

  const W = 560;
  const H = 160;
  const padX = 10;
  const padY = 10;

  const pts = chartData.map((d, i) => {
    const x = padX + (i / Math.max(chartData.length - 1, 1)) * (W - padX * 2);
    const y = H - padY - ((d.value - min) / range) * (H - padY * 2);
    return { x, y, ...d };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-slate-900 font-semibold text-sm">{title}</h3>
          <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${trendClassName}`}>
            {isUpTrend ? 'Up' : 'Down'} · {computedTrendLabel}
          </span>
        </div>
      </div>

      {data.length === 0 && (
        <div className="mb-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
          Live series is empty right now. Showing a placeholder trend so the graph area is always visible.
        </div>
      )}

      <div className="flex items-end gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-slate-900">${chartData.reduce((sum, point) => sum + point.value, 0).toLocaleString()}</p>
          <p className="text-slate-400 text-xs">{totalLabel}</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((t) => {
          const y = H - padY - t * (H - padY * 2);
          return (
            <line key={t} x1={padX} y1={y} x2={W - padX} y2={y} stroke="#F1F5F9" strokeWidth="1" />
          );
        })}

        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#3B82F6" strokeWidth="2.5" />
            <text x={p.x} y={H + 14} textAnchor="middle" fontSize="10" fill="#94A3B8">{p.month}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
