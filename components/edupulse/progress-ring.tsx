export function ProgressRing({
  value,
  label,
  sublabel,
  color = 'var(--primary)',
  size = 112,
}: {
  value: number
  label: string
  sublabel?: string
  color?: string
  size?: number
}) {
  const stroke = 9
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label}: ${value}%`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xl font-semibold">
          {value}%
        </span>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  )
}
