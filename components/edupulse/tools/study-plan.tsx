'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLAN = [
  { day: 'Mon', date: 'Sep 28', focus: 'Arrays & Linked Lists', tasks: ['Read p.1–12', '10 flashcards'], mins: 45, tone: 'chart-1' },
  { day: 'Tue', date: 'Sep 29', focus: 'Stacks & Queues', tasks: ['Audio ch. 2', 'Quiz: 5 Qs'], mins: 40, tone: 'chart-1' },
  { day: 'Wed', date: 'Sep 30', focus: 'Binary Search Trees', tasks: ['Read p.13–24', 'Draw a BST'], mins: 60, tone: 'chart-2' },
  { day: 'Thu', date: 'Oct 1', focus: 'Heaps & Priority Queues', tasks: ['Video explainer', '8 flashcards'], mins: 50, tone: 'chart-2' },
  { day: 'Fri', date: 'Oct 2', focus: 'Graphs: BFS & DFS', tasks: ['Read p.25–36', 'Code a BFS'], mins: 60, tone: 'chart-3' },
  { day: 'Sat', date: 'Oct 3', focus: 'Hashing', tasks: ['ELI5 summary', 'Quiz: 8 Qs'], mins: 35, tone: 'chart-4' },
  { day: 'Sun', date: 'Oct 4', focus: 'Mock Exam & Review', tasks: ['Full practice test', 'Review mistakes'], mins: 90, tone: 'chart-5' },
]

export function StudyPlan() {
  const [done, setDone] = useState<string[]>([])
  const total = PLAN.reduce((s, d) => s + d.mins, 0)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-medium">7-Day Plan · {Math.round(total / 60)}h total</h4>
        <span className="font-mono text-xs text-muted-foreground">
          {done.length}/7 days complete
        </span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${(done.length / 7) * 100}%` }} />
      </div>
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        {PLAN.map((d) => {
          const isDone = done.includes(d.day)
          return (
            <li key={d.day}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => setDone((prev) => (isDone ? prev.filter((x) => x !== d.day) : [...prev, d.day]))}
                className={cn(
                  'flex h-full w-full flex-col gap-2 rounded-xl border bg-secondary/30 p-3 text-left transition hover:-translate-y-0.5',
                  isDone && 'border-success/50 bg-success/10',
                )}
                style={{ borderTopWidth: 3, borderTopColor: `var(--${d.tone})` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{d.day}</span>
                  <span
                    className={cn(
                      'flex size-4 items-center justify-center rounded border',
                      isDone && 'border-success bg-success text-background',
                    )}
                  >
                    {isDone && <Check className="size-3" aria-hidden />}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">{d.date}</span>
                <p className="text-pretty text-sm font-medium leading-snug">{d.focus}</p>
                <ul className="mt-auto flex flex-col gap-1">
                  {d.tasks.map((t) => (
                    <li key={t} className="text-[11px] text-muted-foreground">
                      · {t}
                    </li>
                  ))}
                </ul>
                <span className="font-mono text-[10px] text-accent">{d.mins} min</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
