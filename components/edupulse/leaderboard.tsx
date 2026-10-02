import { Crown, Medal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LEADERBOARD } from '@/lib/edupulse-data'

const PODIUM = {
  1: { label: 'Gold', a: 'oklch(0.85 0.16 85)', b: 'oklch(0.65 0.14 60)', text: 'text-[oklch(0.8_0.16_85)]', order: 'md:order-2', lift: 'md:-translate-y-6' },
  2: { label: 'Silver', a: 'oklch(0.9 0.01 260)', b: 'oklch(0.6 0.02 260)', text: 'text-[oklch(0.78_0.01_260)]', order: 'md:order-1', lift: '' },
  3: { label: 'Bronze', a: 'oklch(0.72 0.12 55)', b: 'oklch(0.5 0.1 40)', text: 'text-[oklch(0.7_0.12_55)]', order: 'md:order-3', lift: '' },
} as const

export function Leaderboard() {
  const top = LEADERBOARD.slice(0, 3)
  const rest = LEADERBOARD.slice(3)

  return (
    <section id="leaderboard" aria-labelledby="brag-title" className="scroll-mt-32">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-warning">Brag Wall</p>
        <h2 id="brag-title" className="mt-2 text-3xl font-semibold tracking-tight">
          Community Leaderboard
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">The people keeping open education fresh, accurate and free.</p>
      </div>

      <ol className="mt-14 grid gap-6 md:grid-cols-3 md:items-end">
        {top.map((p) => {
          const style = PODIUM[p.rank as 1 | 2 | 3]
          return (
            <li key={p.name} className={cn(style.order, style.lift)}>
              <div
                className="spin-border rounded-2xl"
                style={{ ['--ring-a' as string]: style.a, ['--ring-b' as string]: style.b }}
              >
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center">
                  <span className={cn('flex items-center gap-1 text-xs font-semibold uppercase tracking-widest', style.text)}>
                    {p.rank === 1 ? <Crown className="size-4" aria-hidden /> : <Medal className="size-4" aria-hidden />}
                    {style.label} · #{p.rank}
                  </span>
                  <span
                    className="flex size-16 items-center justify-center rounded-full text-lg font-semibold text-background"
                    style={{ background: `linear-gradient(135deg, ${style.a}, ${style.b})` }}
                  >
                    {p.initials}
                  </span>
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.country}</p>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2 border-t pt-3">
                    <div>
                      <p className="font-mono text-lg font-semibold">{p.points.toLocaleString()}</p>
                      <p className="text-[11px] text-muted-foreground">Points</p>
                    </div>
                    <div>
                      <p className="font-mono text-lg font-semibold">{p.resources}</p>
                      <p className="text-[11px] text-muted-foreground">Resources shared</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <ol className="mx-auto mt-8 max-w-3xl divide-y rounded-2xl border bg-card">
        {rest.map((p) => {
          const isYou = p.country === 'You'
          return (
            <li key={p.name} className={cn('flex items-center gap-4 px-5 py-3', isYou && 'bg-primary/10')}>
              <span className="w-8 font-mono text-sm text-muted-foreground">#{p.rank}</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold">{p.initials}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {p.name} {isYou && <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">YOU</span>}
                </p>
                <p className="text-xs text-muted-foreground">{p.resources} resources shared</p>
              </div>
              <span className="font-mono text-sm font-medium">{p.points.toLocaleString()} pts</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
