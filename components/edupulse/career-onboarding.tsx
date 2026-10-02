'use client'

import { useState } from 'react'
import { ArrowRight, Check, Clock, Plus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SKILL_OPTIONS, getRecommendations } from '@/lib/edupulse-data'
import { useApp } from './app-provider'

export function CareerOnboarding() {
  const { skill, setSkill } = useApp()
  const [otherOpen, setOtherOpen] = useState(false)
  const [custom, setCustom] = useState('')
  const isCustom = !SKILL_OPTIONS.includes(skill as (typeof SKILL_OPTIONS)[number]) && skill !== 'AI & Full-Stack Engineering'
  const recs = getRecommendations(skill)

  const saveCustom = () => {
    const value = custom.trim()
    if (!value) return
    setSkill(value)
    setOtherOpen(false)
  }

  return (
    <section id="onboarding" aria-labelledby="onboarding-title" className="scroll-mt-32">
      <div className="gradient-border relative overflow-hidden rounded-2xl bg-card p-6 md:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Personalize your pulse</p>
            <h2 id="onboarding-title" className="mt-2 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              What skill or career path are you interested in?
            </h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">
              Pick a path and EduSphere tunes recommendations, study plans and quizzes to your goal.
            </p>

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Career paths">
              {SKILL_OPTIONS.map((opt) => {
                const active = skill === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSkill(opt)
                      setOtherOpen(false)
                    }}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95',
                      active
                        ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_20px_var(--glow)]'
                        : 'bg-secondary/50 hover:border-primary/50',
                    )}
                  >
                    {active && <Check className="size-3.5" aria-hidden />}
                    {opt}
                  </button>
                )
              })}
              <button
                type="button"
                aria-expanded={otherOpen}
                aria-controls="other-skill"
                onClick={() => setOtherOpen((o) => !o)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border border-dashed px-4 py-2 text-sm font-medium transition active:scale-95',
                  otherOpen || isCustom ? 'border-accent text-accent' : 'hover:border-accent/60',
                )}
              >
                <Plus className={cn('size-3.5 transition-transform', otherOpen && 'rotate-45')} aria-hidden />
                {isCustom ? skill : 'Other'}
              </button>
            </div>

            <div
              id="other-skill"
              className={cn(
                'grid transition-all duration-300 ease-out',
                otherOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <form
                className="flex gap-2 overflow-hidden"
                onSubmit={(e) => {
                  e.preventDefault()
                  saveCustom()
                }}
              >
                <label htmlFor="custom-skill" className="sr-only">
                  Custom skill
                </label>
                <input
                  id="custom-skill"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  tabIndex={otherOpen ? 0 : -1}
                  placeholder="e.g. Quantum Computing, Cybersecurity"
                  className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:border-accent focus:ring-3 focus:ring-accent/20"
                />
                <button
                  type="submit"
                  tabIndex={otherOpen ? 0 : -1}
                  disabled={!custom.trim()}
                  className="h-10 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:brightness-110 disabled:opacity-50"
                >
                  Save Skill
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4 text-primary" aria-hidden />
                Recommended for <span className="text-primary">{skill}</span>
              </h3>
            </div>
            <ul key={skill} className="mt-4 grid gap-3 sm:grid-cols-3" aria-live="polite">
              {recs.map((r, i) => (
                <li
                  key={r.title}
                  className="group flex flex-col justify-between gap-4 rounded-xl border bg-secondary/40 p-4 transition hover:-translate-y-1 hover:border-primary/40 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-accent">{r.type}</span>
                    <p className="mt-1.5 text-pretty font-medium leading-snug">{r.title}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" aria-hidden /> {r.minutes}m · {r.level}
                    </span>
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
