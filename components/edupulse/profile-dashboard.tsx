'use client'

import { useEffect, useState } from 'react'
import {
  Award,
  BadgeCheck,
  Bookmark,
  Clock,
  Eye,
  Globe,
  Headphones,
  Pencil,
  ShieldCheck,
  Target,
  Trophy,
  Upload,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { RESOURCES, UPLOAD_HISTORY, WEEKLY_HOURS } from '@/lib/edupulse-data'
import { useApp } from './app-provider'
import { ProgressRing } from './progress-ring'

const STATS = [
  { label: 'Contributor Rank', value: '#12', sub: 'Global', icon: Trophy },
  { label: 'Uploaded Resources', value: '18', sub: '+3 this month', icon: Upload },
  { label: 'Verifications Approved', value: '42', sub: '96% accuracy', icon: ShieldCheck },
  { label: 'Community Karma', value: '98%', sub: 'Top 2%', icon: Globe },
]

const BADGES = [
  { name: 'Top Fact-Checker', desc: '40+ verified corrections', icon: BadgeCheck, tone: 'text-warning bg-warning/15 border-warning/30' },
  { name: 'Audio Converter Pro', desc: '25 PDFs turned to audio', icon: Headphones, tone: 'text-accent bg-accent/15 border-accent/30' },
  { name: 'SDG Champion', desc: 'Shared in 5+ languages', icon: Award, tone: 'text-primary bg-primary/15 border-primary/30' },
]

export function ProfileDashboard() {
  const { profileOpen, setProfileOpen, skill, saved } = useApp()
  const [tab, setTab] = useState<'saved' | 'uploads'>('saved')
  const maxHours = Math.max(...WEEKLY_HOURS.map((d) => d.hours))
  const totalHours = WEEKLY_HOURS.reduce((s, d) => s + d.hours, 0)
  const savedResources = RESOURCES.filter((r) => saved.includes(r.id))

  useEffect(() => {
    if (!profileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setProfileOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [profileOpen, setProfileOpen])

  if (!profileOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close profile dashboard"
        onClick={() => setProfileOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l bg-card shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <div className="relative overflow-hidden border-b p-6">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <div className="relative flex items-start gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-semibold text-primary-foreground shadow-[0_0_32px_var(--glow)]">
              AR
            </span>
            <div className="flex-1">
              <h2 id="profile-title" className="text-xl font-semibold tracking-tight">
                Alex Rivera
              </h2>
              <p className="text-sm text-muted-foreground">Level 4 Contributor · Joined Mar 2025</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                  1,450 PTS
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-xs text-warning">
                  <BadgeCheck className="size-3" aria-hidden /> Master Fact-Checker
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-lg border bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <section aria-label="Contributor statistics" className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map(({ label, value, sub, icon: Icon }) => (
              <div key={label} className="gradient-border rounded-xl bg-secondary/40 p-4">
                <Icon className="size-4 text-primary" aria-hidden />
                <p className="mt-3 font-mono text-2xl font-semibold">{value}</p>
                <p className="text-xs font-medium">{label}</p>
                <p className="text-[11px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="analytics-title" className="grid gap-4 md:grid-cols-5">
            <div className="rounded-xl border bg-secondary/30 p-4 md:col-span-3">
              <div className="flex items-center justify-between">
                <h3 id="analytics-title" className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="size-4 text-accent" aria-hidden /> Weekly Study Hours
                </h3>
                <span className="font-mono text-xs text-muted-foreground">{totalHours.toFixed(1)}h total</span>
              </div>
              <div className="mt-4 flex h-36 items-end gap-2" role="img" aria-label="Bar chart of weekly study hours">
                {WEEKLY_HOURS.map((d) => (
                  <div key={d.day} className="group flex flex-1 flex-col items-center gap-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">
                      {d.hours}h
                    </span>
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-primary/60 to-accent transition-all duration-700 group-hover:brightness-125"
                      style={{ height: `${(d.hours / maxHours) * 100}%` }}
                    />
                    <span className="text-[11px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-around gap-4 rounded-xl border bg-secondary/30 p-4 md:col-span-2 md:flex-col">
              <ProgressRing value={88} label="Quiz Accuracy" sublabel="Last 30 quizzes" color="var(--accent)" size={100} />
              <ProgressRing value={64} label="Goal Progress" sublabel="Pathway milestones" size={100} />
            </div>
          </section>

          <section aria-labelledby="pathway-title" className="gradient-border rounded-xl bg-primary/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 id="pathway-title" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Target className="size-3.5" aria-hidden /> Career Interest & Skill Pathway
                </h3>
                <p className="mt-1 text-lg font-semibold">{skill}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false)
                  document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary/50"
              >
                <Pencil className="size-3.5" aria-hidden /> Edit Interests
              </button>
            </div>
            <div className="mt-4 flex gap-1.5">
              {['Foundations', 'Core Skills', 'Projects', 'Specialize', 'Portfolio'].map((step, i) => (
                <div key={step} className="flex-1">
                  <div className={cn('h-1.5 rounded-full', i < 3 ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted')} />
                  <p className={cn('mt-1.5 text-[10px]', i < 3 ? 'text-foreground' : 'text-muted-foreground')}>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="badges-title">
            <h3 id="badges-title" className="mb-3 text-sm font-medium">
              Achievement Badges
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {BADGES.map(({ name, desc, icon: Icon, tone }) => (
                <div key={name} className="flex items-center gap-3 rounded-xl border bg-secondary/30 p-3 transition hover:-translate-y-0.5">
                  <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl border', tone)}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-[11px] text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Your resources">
            <div role="tablist" className="mb-3 inline-flex rounded-lg border bg-secondary/50 p-1">
              {(
                [
                  ['saved', `Saved Resources (${savedResources.length})`],
                  ['uploads', 'Upload History'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition',
                    tab === key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <ul className="divide-y rounded-xl border">
              {tab === 'saved' &&
                (savedResources.length === 0 ? (
                  <li className="p-4 text-sm text-muted-foreground">No saved resources yet. Save items from the library.</li>
                ) : (
                  savedResources.map((r) => (
                    <li key={r.id} className="flex items-center gap-3 p-3">
                      <Bookmark className="size-4 shrink-0 text-primary" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.author} · {r.language}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-success">{r.freshness}% fresh</span>
                    </li>
                  ))
                ))}
              {tab === 'uploads' &&
                UPLOAD_HISTORY.map((u) => (
                  <li key={u.title} className="flex items-center gap-3 p-3">
                    <Upload className="size-4 shrink-0 text-accent" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{u.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        {u.date} · <Eye className="size-3" aria-hidden /> {u.views.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-medium',
                        u.status === 'Verified' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning',
                      )}
                    >
                      {u.status}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </aside>
    </div>
  )
}
